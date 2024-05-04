# import unittest
# import sys
# import os

# main_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'Main'))
# sys.path.append(main_path)


# from data_collector import app



# class TestDataCollector(unittest.TestCase):

#     def setUp(self):
#         self.app = app.test_client()

#         app.config['TESTING'] = True

#     def tearDown(self):
#         pass

#     def test_collect_data(self):
#         # Make a POST request to the /collect-data endpoint
#         response = self.app.post('/collect-data')
#         # Assert that the response status code is 200
#         self.assertEqual(response.status_code, 200)
#         # Assert that the response contains the expected message
#         self.assertEqual(response.data.decode('utf-8'), "Data collected and stored successfully in PostgreSQL.")

# if __name__ == '__main__':
#     unittest.main()

import unittest
from unittest.mock import patch, MagicMock
import sys
import os

# Add the path to your main application
main_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'Main'))
sys.path.append(main_path)

# Import your Flask application
from data_collector import app


class TestDataCollector(unittest.TestCase):

    def setUp(self):
        self.app = app.test_client()
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

    @patch('data_collector.create_connection')
    def test_database_connection(self, mock_create_connection):
        # Mock create_connection to return a MagicMock object
        mock_connection = MagicMock()
        mock_create_connection.return_value = mock_connection

        # Call the create_connection function
        connection = app.create_connection()

        # Ensure that create_connection is called
        mock_create_connection.assert_called_once()

        # Ensure that the events table is created
        mock_connection.cursor.return_value.execute.assert_called_once_with('''CREATE TABLE IF NOT EXISTS events (
                        id SERIAL PRIMARY KEY,
                        event_name TEXT,
                        date TEXT,
                        time TEXT,
                        event_description TEXT,
                        valid_date INTEGER
                    );''')

    @patch('data_collector.get_html_content')
    def test_web_scraping(self, mock_get_html_content):
        # Mock get_html_content to return a BeautifulSoup object
        mock_html_content = MagicMock()
        mock_get_html_content.return_value = mock_html_content

        # Mock HTML content
        mock_html_content.find_all.return_value = [
            MagicMock(find=lambda **kwargs: MagicMock(get_text=lambda: "Event 1", attrs={"title": "Activity Details"})),
            MagicMock(find=lambda **kwargs: MagicMock(get_text=lambda: "01 April 2024 | 10:00 AM", attrs={"class": "margin-top-5"})),
            MagicMock(get_text=lambda: "Description 1")
        ]

        # Call the collect_data function
        with app.app_context():
            app.collect_data()

        # Ensure that get_html_content is called with the correct URL
        mock_get_html_content.assert_called_once_with("https://countmein.bouldercolorado.gov/D/Coms")

        # Add more assertions to test the extraction and insertion of event data as needed


if __name__ == '__main__':
    unittest.main()

