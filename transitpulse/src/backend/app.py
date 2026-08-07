from flask import Flask

app = Flask(__name__)


@app.route("/")
def home():
    return {
        "message": "TransitPulse Backend Running"
    }

@app.route("/routes")
def get_routes():
    return {
        "message": "Fetching all routes"
    }

if __name__ == "__main__":
    app.run(debug=True)