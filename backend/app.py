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


#load buses from database
@app.route("/buses")
def get_buses():

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute("SELECT * FROM buses")

    rows = cursor.fetchall()

    connection.close()

    buses = []

    for row in rows:
        bus = {
            "id": row[0],
            "bus_number": row[1],
            "from_city": row[2],
            "to_city": row[3],
            "departure": row[4]
        }

        buses.append(bus)

    return buses


#search buses based on from and to cities
@app.route("/search", methods=["POST"])
def search():

    data = request.get_json()

    from_city = data["from"]
    to_city = data["to"]

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute(
        """
        SELECT * FROM buses
        WHERE from_city = %s
        AND to_city = %s
        """,
        (from_city, to_city)
    )

    rows = cursor.fetchall()

    connection.close()

    buses = []

    for row in rows:
        bus = {
            "id": row[0],
            "bus_number": row[1],
            "from_city": row[2],
            "to_city": row[3],
            "departure": row[4]
        }

        buses.append(bus)

    return buses


#fetch bus details based on bus id fetched from the URL
@app.route("/BusDetails/<int:bus_id>")
def get_bus_details(bus_id):

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute(
        """
        SELECT * FROM buses
        WHERE id = %s
        """,
        (bus_id,)
    )

    row = cursor.fetchone()

    if not row:
        connection.close()
        return {"error": "Bus not found"}, 404

    cursor.execute(
        """
        SELECT stop_order, stop_name, arrival_time
        FROM route_stops
        WHERE bus_id = %s
        ORDER BY stop_order
        """,
        (bus_id,)
    )
    stop_rows = cursor.fetchall()
    connection.close()

    return {
        "id": row[0],
        "bus_number": row[1],
        "from_city": row[2],
        "to_city": row[3],
        "departure": row[4],
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
        SELECT route_stops.id, buses.bus_number, route_stops.stop_order
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
                "stop_order": row[2]  
            }
            routes.append(route)
    
    return(routes)

@app.route("/reportBus", methods=["POST"])
def reportBus():
    print("reported a bus")
    report = request.get_json(silent=True) or {}
    required_fields = ("bus_number", "current_Stop", "direction", "status")
    missing_fields = [field for field in required_fields if not str(report.get(field, "")).strip()]

    if missing_fields:
        return {
            "error": "Missing required fields",
            "fields": missing_fields
        }, 400

    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute(
        """
        INSERT INTO bus_reports (bus_number, current_Stop, direction, status)
        VALUES (%s, %s, %s, %s)
        """,
        (report["bus_number"], report["current_Stop"], report["direction"], report["status"])
    )
    connection.commit()
    connection.close()
    return {
        "message": "Bus report received",
        "report": report
    }, 201

    

@app.route("/getAllBusReports", methods=["GET"])
def getAllBusReports():
    connection = get_connection()
    cursor = connection.cursor()

    cursor.execute(
        """
        SELECT * FROM bus_reports
        """    
    )

    result = cursor.fetchall()
    connection.close()

    if (result):
        reports=[]
        for row in result:
            report = {
                "id": row[0],
                "bus_number": row[1],
                "current_Stop": row[2],
                "direction": row[3],
                "status": row[4]
            }
            reports.append(report)
    
    return(reports)



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