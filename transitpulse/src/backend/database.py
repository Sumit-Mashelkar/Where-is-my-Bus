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
DELETE FROM buses
""")

cursor.execute("""
DELETE FROM route_stops
""")

cursor.execute("""
CREATE TABLE IF NOT EXISTS route_stops (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    bus_id INTEGER NOT NULL,
    stop_order INTEGER NOT NULL,
    stop_name TEXT NOT NULL,
    arrival_time TEXT,
    FOREIGN KEY (bus_id) REFERENCES buses(id),
    UNIQUE (bus_id, stop_order)
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

bus_ids = {}
for bus_id, bus_number in cursor.execute("SELECT id, bus_number FROM buses"):
    bus_ids.setdefault(bus_number, []).append(bus_id)

route_stops = {
    '101': [
        ('Bengaluru', '08:30'),
        ('Mandya', '09:35'),
        ('Mysuru', '10:45'),
    ],
    '205': [
        ('Bengaluru', '09:15'),
        ('Ramanagara', '10:00'),
        ('Mandya', '10:35'),
        ('Mysuru', '11:30'),
    ],
    '310': [
        ('Bengaluru', '10:00'),
        ('Tumakuru', '11:10'),
        ('Chitradurga', '13:00'),
        ('Hubballi', '15:20'),
    ],
}

for bus_number, stops in route_stops.items():
    for bus_id in bus_ids.get(bus_number, []):
        for stop_order, (stop_name, arrival_time) in enumerate(stops, start=1):
            cursor.execute(
                """
                INSERT OR IGNORE INTO route_stops
                    (bus_id, stop_order, stop_name, arrival_time)
                VALUES (?, ?, ?, ?)
                """,
                (bus_id, stop_order, stop_name, arrival_time)
            )

cursor.execute("""
CREATE TABLE IF NOT EXISTS bus_reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    bus_number TEXT,
    current_Stop TEXT,
    direction TEXT,
    status TEXT,
    vote INTEGER DEFAULT 0,
    status TEXT DEFAULT 'unverified'
)
""")

connection.commit()
connection.close()

print("Database created with two tables [buses] and [route_stops] and sample data inserted successfully.")