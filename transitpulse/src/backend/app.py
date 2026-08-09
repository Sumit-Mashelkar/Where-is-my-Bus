from flask import Flask
from flask import request

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

@app.route("/search", methods=["POST"])
def search():
    print("POST request received")

    data = request.get_json()

    print(data)

    return {
        "message": "Success"
    }

@app.route("/routes")
def get_routes():
    return {
        "message": "Fetching all routes"
    }

if __name__ == "__main__":
    app.run(debug=True)