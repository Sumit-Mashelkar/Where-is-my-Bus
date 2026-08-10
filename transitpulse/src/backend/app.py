from flask import Flask
from flask import request
import sqlite3

app = Flask(__name__)


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

if __name__ == "__main__":
    app.run(debug=True)