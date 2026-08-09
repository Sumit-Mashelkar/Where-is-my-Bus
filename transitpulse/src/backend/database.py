import sqlite3

connection = sqlite3.connect("transitpulse.db")

cursor = connection.cursor()

cursor.execute("""
CREATE TABLE IF NOT EXISTS buses (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    bus_number TEXT,
    from_city TEXT,
    to_city TEXT,
    departure TEXT
)
""")

connection.commit()
connection.close()

print("Database created!")