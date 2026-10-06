import os
from pathlib import Path

import psycopg
from dotenv import load_dotenv

# Keep the local settings and schema path beside this file.
BACKEND_DIR = Path(__file__).resolve().parent
load_dotenv(BACKEND_DIR / ".env")

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "postgresql://postgres@localhost:5433/transitpulse",
)
SCHEMA_PATH = BACKEND_DIR / "schema.sql"


def get_connection():
    # Use the password from backend/.env if one is configured.
    password = os.getenv("PGPASSWORD")
    if password:
        return psycopg.connect(DATABASE_URL, password=password)

    return psycopg.connect(DATABASE_URL)


def setup_database():
    # Apply the tables and sample bus data from schema.sql.
    schema = SCHEMA_PATH.read_text(encoding="utf-8")

    with get_connection() as connection:
        connection.execute(schema)


if __name__ == "__main__":
    setup_database()
    print("PostgreSQL schema applied successfully.")