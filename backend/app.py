from datetime import datetime

from flask import Flask, request
from flask_cors import CORS

from database import get_connection

app = Flask(__name__)

CORS(app)
@app.route("/")
def home():
    return {
        "message": "TransitPulse Backend Running"

    }

# @app.route("/search", methods=["POST"])
# def search():
#     data = request.get_json()

#     from_city = data["from"]
#     to_city = data["to"]

#     return {
#         "message": "Search received!",
#         "from": from_city,
#         "to": to_city
#     }

# @app.route("/search", methods=["POST"])
# def search():
#     print("POST request received")

#     data = request.get_json()

#     print(data)

#     return {
#         "message": "Success"
#     }

@app.route("/routes")
def get_routes():
    return {
        "message": "Fetching all routes"
    }


@app.route("/destinations")
def get_destinations():
    query = request.args.get("q", "").strip()
    if not query:
        return []

    with get_connection() as connection:
        rows = connection.execute(
            """
            SELECT DISTINCT to_city
            FROM buses
            WHERE to_city ILIKE %s
            ORDER BY to_city
            LIMIT 8
            """,
            (f"{query}%",),
        ).fetchall()

    return [row[0] for row in rows]


@app.route("/origins")
def get_origins():
    query = request.args.get("q", "").strip()
    if not query:
        return []

    with get_connection() as connection:
        rows = connection.execute(
            """
            SELECT DISTINCT from_city
            FROM buses
            WHERE from_city ILIKE %s
            ORDER BY from_city
            LIMIT 8
            """,
            (f"{query}%",),
        ).fetchall()

    return [row[0] for row in rows]


def bus_to_dict(row):
    return {
        "id": row[0],
        "bus_number": row[1],
        "bus_name": row[2],
        "from_city": row[3],
        "to_city": row[4],
        "departure": str(row[5])[:5],
    }


@app.route("/buses", methods=["POST"])
def create_bus():
    data = request.get_json(silent=True) or {}
    required_fields = ("bus_name", "bus_number", "from_city", "to_city", "departure")
    values = {
        field: str(data.get(field) or "").strip()
        for field in required_fields
    }
    missing_fields = [field for field, value in values.items() if not value]

    if missing_fields:
        return {"error": "Missing required fields", "fields": missing_fields}, 400

    try:
        departure = datetime.strptime(values["departure"], "%H:%M").time()
    except ValueError:
        return {"error": "Departure must use HH:MM format"}, 400

    with get_connection() as connection:
        row = connection.execute(
            """
            INSERT INTO buses (bus_name, bus_number, from_city, to_city, departure)
            VALUES (%s, %s, %s, %s, %s)
            ON CONFLICT (bus_number) DO NOTHING
            RETURNING id, bus_number, bus_name, from_city, to_city, departure
            """,
            (
                values["bus_name"],
                values["bus_number"],
                values["from_city"],
                values["to_city"],
                departure,
            ),
        ).fetchone()

        if row:
            connection.execute(
                """
                INSERT INTO route_stops (bus_id, stop_order, stop_name, arrival_time)
                VALUES (%s, 1, %s, %s), (%s, 2, %s, NULL)
                """,
                (
                    row[0],
                    values["from_city"],
                    values["departure"],
                    row[0],
                    values["to_city"],
                ),
            )

    if not row:
        return {"error": "A bus with that number already exists"}, 409

    return bus_to_dict(row), 201


@app.route("/buses", methods=["GET"])
def get_buses():
    with get_connection() as connection:
        rows = connection.execute(
            """
            SELECT id, bus_number, bus_name, from_city, to_city, departure
            FROM buses
            ORDER BY id
            """
        ).fetchall()

    return [bus_to_dict(row) for row in rows]


#search buses based on from and to cities
@app.route("/search", methods=["POST"])
def search():

    data = request.get_json()

    from_city = data["from"]
    to_city = data["to"]

    with get_connection() as connection:
        rows = connection.execute(
            """
            SELECT id, bus_number, bus_name, from_city, to_city, departure
            FROM buses
            WHERE from_city = %s AND to_city = %s
            ORDER BY departure
            """,
            (from_city, to_city),
        ).fetchall()

    return [bus_to_dict(row) for row in rows]


#fetch bus details based on bus id fetched from the URL
@app.route("/BusDetails/<int:bus_id>")
def get_bus_details(bus_id):

    with get_connection() as connection:
        row = connection.execute(
            """
            SELECT id, bus_number, bus_name, from_city, to_city, departure
            FROM buses
            WHERE id = %s
            """,
            (bus_id,),
        ).fetchone()

        if not row:
            return {"error": "Bus not found"}, 404

        stop_rows = connection.execute(
            """
            SELECT stop_order, stop_name, arrival_time
            FROM route_stops
            WHERE bus_id = %s
            ORDER BY stop_order
            """,
            (bus_id,),
        ).fetchall()

    return {
        **bus_to_dict(row),
        "stops": [
            {
                "order": stop[0],
                "name": stop[1],
                "arrival_time": stop[2]
            }
            for stop in stop_rows
        ]
    }

# fetches all the routes from buses table
@app.route("/allRoutes")
def allRoutes():

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute(
        """
        SELECT route_stops.id, buses.bus_number, buses.bus_name, route_stops.stop_order
        FROM route_stops
        JOIN buses ON buses.id = route_stops.bus_id
        ORDER BY buses.id, route_stops.stop_order
        """
    )

    result = cursor.fetchall()

    if (result):
        routes=[]
        for row in result:
            route = {
                "id": row[0],
                "bus_number": row[1],
                "bus_name": row[2],
                "stop_order": row[3]
            }
            routes.append(route)
    
    return(routes)

@app.route("/reportBus", methods=["POST"])
def reportBus():
    report = request.get_json(silent=True) or {}
    values = {
        "bus_number": str(report.get("bus_number") or "").strip(),
        "current_stop": str(report.get("current_stop") or report.get("current_Stop") or "").strip(),
        "direction": str(report.get("direction") or "").strip(),
        "status": str(report.get("status") or "").strip(),
    }
    missing_fields = [field for field, value in values.items() if not value]

    if missing_fields:
        return {
            "error": "Missing required fields",
            "fields": missing_fields
        }, 400

    with get_connection() as connection:
        bus = connection.execute(
            "SELECT id FROM buses WHERE bus_number = %s",
            (values["bus_number"],),
        ).fetchone()

        if not bus:
            return {"error": "Bus not found"}, 404

        stop = connection.execute(
            """
            SELECT id FROM route_stops
            WHERE bus_id = %s AND LOWER(BTRIM(stop_name)) = LOWER(%s)
            """,
            (bus[0], values["current_stop"]),
        ).fetchone()

        if not stop:
            return {"error": "Stop not found on this bus route"}, 400

        report_row = connection.execute(
            """
            INSERT INTO bus_reports (bus_id, current_stop_id, direction, updates)
            VALUES (%s, %s, %s, %s)
            RETURNING id
            """,
            (bus[0], stop[0], values["direction"], values["status"]),
        ).fetchone()

    return {
        "message": "Bus report received",
        "report_id": report_row[0],
        "report": values,
    }, 201

    

@app.route("/getAllBusReports", methods=["GET"])
def getAllBusReports():
    with get_connection() as connection:
        rows = connection.execute(
            """
                 SELECT reports.id, buses.bus_number, route_stops.stop_name,
                     reports.direction, reports.updates, reports.vote,
                   reports.created_at
            FROM bus_reports AS reports
            JOIN buses ON buses.id = reports.bus_id
                 LEFT JOIN route_stops ON route_stops.id = reports.current_stop_id
            ORDER BY reports.created_at DESC
            """
        ).fetchall()

    return [
        {
            "id": row[0],
            "bus_number": row[1],
            "current_Stop": row[2],
            "direction": row[3],
            "status": row[4],
            "vote": row[5],
            "created_at": row[6].isoformat(),
        }
        for row in rows
    ]



@app.route("/Updates", methods=["GET"])
def getUpdates():
    print("finding the latest updates..")

    connection = get_connection()
    cursor = connection.cursor()
    
    cursor.execute(
            """
            SELECT * FROM bus_reports
            """    
        )
    
    result = cursor.fetchall()
    connection.close()

    return(result)



if __name__ == "__main__":
    app.run(debug=True)