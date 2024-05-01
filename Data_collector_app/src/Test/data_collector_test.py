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


main_path = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', 'Main'))
sys.path.append(main_path)


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

        # Call create_connection
        connection = app.create_connection()

        # Ensure that create_connection is called
        mock_create_connection.assert_called_once()

        # Ensure that the database connection is established successfully
        self.assertIsNotNone(connection)

        # Ensure that the connection uses the correct database settings
        self.assertEqual(connection.dsn, "dbname=volunteer_management user=postgres password=education host=localhost port=5432")

        # Ensure that the events and users tables are created after connection
        cursor_mock = MagicMock()
        mock_connection.cursor.return_value.__enter__.return_value = cursor_mock
        cursor_mock.execute.side_effect = [None, None]  # Mock successful table creation

        app.create_events_table(connection)
        app.create_users_table(connection)

        # Ensure that cursor.execute is called with the correct SQL queries
        cursor_mock.execute.assert_any_call('''CREATE TABLE IF NOT EXISTS events (
                        id SERIAL PRIMARY KEY,
                        event_name TEXT,
                        date_and_time TEXT,
                        event_description TEXT
                    );''')
        cursor_mock.execute.assert_any_call('''CREATE TABLE IF NOT EXISTS users (
                        id SERIAL not null,
                        email TEXT primary key,
                        password TEXT not null
                    );''')

        # Clean up
        cursor_mock.close.assert_called()
        mock_connection.close.assert_called()

    @patch('data_collector.get_html_content')
    def test_web_scraping(self, mock_get_html_content):
        # Mock get_html_content to return a BeautifulSoup object
        mock_html_content = MagicMock()
        mock_get_html_content.return_value = mock_html_content

        # Mock HTML content
        mock_html_content.find_all.return_value = [
            MagicMock(get_text=lambda: "Event 1", attrs={"title": "Activity Details"}),
            MagicMock(get_text=lambda: "Date and Time 1", attrs={"class": "margin-top-5"}),
            MagicMock(get_text=lambda: "Description 1")
        ]

        # Call the collect_data function
        with app.app_context():
            app.collect_data()

        # Ensure that get_html_content is called with the correct URL
        mock_get_html_content.assert_called_once_with("https://countmein.bouldercolorado.gov/D/Coms")

        # Ensure that event data is inserted into the database
        # You may need to mock the psycopg2 cursor and connection to check the database interaction

    # Add more test cases for other functionalities as needed


if __name__ == '__main__':
    unittest.main()
