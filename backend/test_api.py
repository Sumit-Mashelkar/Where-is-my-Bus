import unittest

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
        self.assertEqual(response.json[0]["bus_number"], "310")


if __name__ == "__main__":
    unittest.main()