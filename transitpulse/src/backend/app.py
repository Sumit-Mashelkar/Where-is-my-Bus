from flask import Flask, request
from flask_cors import CORS
import sqlite3

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


#load buses from database
@app.route("/buses")
def get_buses():

    connection = sqlite3.connect("transitpulse.db")
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

    connection = sqlite3.connect("transitpulse.db")
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

    connection = sqlite3.connect("transitpulse.db")
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

    connection.close()

    if row:
        bus = {
            "id": row[0],
            "bus_number": row[1],
            "from_city": row[2],
            "to_city": row[3],
            "departure": row[4]
        }
        return bus
    else:
        return {"error": "Bus not found"}, 404

@app.route("/allRoutes")
def allRoutes():

    connection = sqlite3.connect("transitpulse.db")
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


    
if __name__ == "__main__":
    app.run(debug=True)