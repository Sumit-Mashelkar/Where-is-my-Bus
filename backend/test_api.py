import unittest
from unittest.mock import Mock, patch
from app import app


class ApiTests(unittest.TestCase):
    def setUp(self):
        self.client = app.test_client()

    def test_search_returns_matching_buses(self):
        response = self.client.post(
            "/search",
            json={"from": "Bengaluru", "to": "Hubballi"},
        )

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json[0]["bus_number"], "KA30373")

    @patch("app.get_connection")
    def test_origins_returns_matching_origin_cities(self, get_connection):
        connection = Mock()
        connection.__enter__ = Mock(return_value=connection)
        connection.__exit__ = Mock(return_value=False)
        connection.execute.return_value.fetchall.return_value = [
            ("Bengaluru",),
            ("Belagavi",),
        ]
        get_connection.return_value = connection

        response = self.client.get("/origins?q=Be")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json, ["Bengaluru", "Belagavi"])
        self.assertEqual(
            connection.execute.call_args.args[1],
            ("Be%",),
        )

    @patch("app.get_connection")
    def test_create_bus_saves_and_returns_bus_name(self, get_connection):
        connection = Mock()
        connection.__enter__ = Mock(return_value=connection)
        connection.__exit__ = Mock(return_value=False)
        connection.execute.side_effect = [
            Mock(fetchone=Mock(return_value=(
                21,
                "KA30123",
                "Mysuru Express",
                "Bengaluru",
                "Mysuru",
                "08:30",
            ))),
            Mock(),
        ]
        get_connection.return_value = connection

        response = self.client.post(
            "/buses",
            json={
                "bus_name": "Mysuru Express",
                "bus_number": "KA30123",
                "from_city": "Bengaluru",
                "to_city": "Mysuru",
                "departure": "08:30",
            },
        )

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json["bus_name"], "Mysuru Express")
        bus_values = connection.execute.call_args_list[0].args[1]
        self.assertEqual(
            bus_values[:4],
            ("Mysuru Express", "KA30123", "Bengaluru", "Mysuru"),
        )
        self.assertEqual(bus_values[4].strftime("%H:%M"), "08:30")
        self.assertEqual(
            connection.execute.call_args.args[1],
            (21, "Bengaluru", "08:30", 21, "Mysuru"),
        )
        self.assertEqual(connection.execute.call_count, 2)

    @patch("app.get_connection")
    def test_create_bus_rejects_invalid_departure(self, get_connection):
        response = self.client.post(
            "/buses",
            json={
                "bus_name": "Mysuru Express",
                "bus_number": "KA30123",
                "from_city": "Bengaluru",
                "to_city": "Mysuru",
                "departure": "not-a-time",
            },
        )

        self.assertEqual(response.status_code, 400)
        self.assertIn("HH:MM", response.json["error"])
        get_connection.assert_not_called()

    @patch("app.get_connection")
    def test_report_bus_resolves_bus_and_saves_report(self, get_connection):
        connection = Mock()
        connection.__enter__ = Mock(return_value=connection)
        connection.__exit__ = Mock(return_value=False)
        connection.execute.side_effect = [
            Mock(fetchone=Mock(return_value=(12,))),
            Mock(fetchone=Mock(return_value=(23,))),
            Mock(fetchone=Mock(return_value=(34,))),
        ]
        get_connection.return_value = connection

        response = self.client.post(
            "/reportBus",
            json={
                "bus_number": "KA30123",
                "current_stop": "Mandya",
                "direction": "Mysuru",
                "status": "Delayed",
            },
        )

        self.assertEqual(response.status_code, 201)
        self.assertEqual(response.json["report_id"], 34)
        self.assertEqual(
            connection.execute.call_args_list[2].args[1],
            (12, 23, "Mysuru", "Delayed"),
        )


if __name__ == "__main__":
    unittest.main()