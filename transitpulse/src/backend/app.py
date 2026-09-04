from pathlib import Path

from flask import Flask, request
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
DATABASE_PATH = Path(__file__).with_name("transitpulse.db")

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


#load buses from database
@app.route("/buses")
def get_buses():

    connection = sqlite3.connect(DATABASE_PATH)
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

    connection = sqlite3.connect(DATABASE_PATH)
    cursor = connection.cursor()

    cursor.execute(
        """
        SELECT * FROM buses
        WHERE from_city = ?
        AND to_city = ?
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

    connection = sqlite3.connect(DATABASE_PATH)
    cursor = connection.cursor()

    cursor.execute(
        """
        SELECT * FROM buses
        WHERE id = 
        ?
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
        WHERE bus_id = ?
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

@app.route("/allRoutes")
def allRoutes():

    connection = sqlite3.connect(DATABASE_PATH)
    cursor = connection.cursor()

    cursor.execute(
        """
        SELECT * FROM buses
        """
    )

    result = cursor.fetchall()

    if (result):
        routes=[]
        for row in result:
            route = {
                "id": row[0],
                "bus_number": row[1],
                "from_city": row[2],
                "to_city": row[3],
                "departure": row[4]
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

    connection = sqlite3.connect(DATABASE_PATH)
    cursor = connection.cursor()

    cursor.execute(
        """
        INSERT INTO bus_reports (bus_number, current_Stop, direction, status)
        VALUES (?, ?, ?, ?)
        """,
        (report["bus_number"], report["current_Stop"], report["direction"], report["status"])
    )
    connection.commit()
    connection.close()
    return {
        "message": "Bus report received",
        "report": report
    }, 201
    
if __name__ == "__main__":
    app.run(debug=True)