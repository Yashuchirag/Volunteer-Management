import unittest
import sys
import os

main_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'Main'))
sys.path.append(main_path)

# Now you can import app from data_collector module
from data_collector import app

# Your test cases continue here...


class TestDataCollector(unittest.TestCase):

    def setUp(self):
        # Create a test client using Flask's test_client method
        self.app = app.test_client()
        # Disable Flask's error catching during tests
        app.config['TESTING'] = True

    def tearDown(self):
        pass

    def test_collect_data(self):
        # Make a POST request to the /collect-data endpoint
        response = self.app.post('/collect-data')
        # Assert that the response status code is 200
        self.assertEqual(response.status_code, 200)
        # Assert that the response contains the expected message
        self.assertEqual(response.data.decode('utf-8'), "Data collected and stored successfully in PostgreSQL.")

if __name__ == '__main__':
    unittest.main()
