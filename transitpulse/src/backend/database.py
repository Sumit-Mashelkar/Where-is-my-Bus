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

cursor.execute("""
INSERT INTO buses (bus_number, from_city, to_city, departure)
VALUES ('101', 'Bengaluru', 'Mysuru', '08:30')
""")

cursor.execute("""
INSERT INTO buses (bus_number, from_city, to_city, departure)
VALUES ('205', 'Bengaluru', 'Mysuru', '09:15')
""")

cursor.execute("""
INSERT INTO buses (bus_number, from_city, to_city, departure)
VALUES ('310', 'Bengaluru', 'Hubballi', '10:00')
""")

connection.commit()
connection.close()

print("Database created and sample data inserted successfully.")