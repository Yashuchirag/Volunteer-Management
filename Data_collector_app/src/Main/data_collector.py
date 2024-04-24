from flask import Flask, abort
import requests
from bs4 import BeautifulSoup
import psycopg2
import json

def get_html_content(url):
    response = requests.get(url)
    if response.status_code == 200:
        return BeautifulSoup(response.text, "html.parser")
    else:
        abort(500, f"Failed to fetch HTML content from {url}. Status code: {response.status_code}")

app = Flask(__name__)
def create_connection():
    
    # Connect to the default PostgreSQL database (usually 'postgres')
    try:

        default_connection = psycopg2.connect(
            user="postgres",
            password="education",
            host="localhost",
            port="5432",
            database="volunteer_management"
        )
        default_connection.autocommit= True
        print("database connection successful")
        default_cursor = default_connection.cursor()
        default_cursor.close()
    except:
        # Create the specified database if it does not exist
        default_connection = psycopg2.connect(
            user="postgres",
            password="education",
            host="localhost",
            port="5432",
            database="postgres"
        )
        default_connection.autocommit= True
        default_cursor = default_connection.cursor()
        sql= '''CREATE database volunteer_management''';
        default_cursor.execute(sql)
        print("database created successfully")
        default_cursor.close()
        default_connection.close()

        # Connect to the specified database
        
        default_connection = psycopg2.connect(
            user="postgres",
            password="education",
            host="localhost",
            port="5432",
            database="volunteer_management"
        )
        default_connection.autocommit= True
        print("database connection successful")
    return default_connection

def create_table(events):
    cursor = events.cursor()
    # Adjust the table schema as per your requirements
    cursor.execute('''CREATE TABLE IF NOT EXISTS events (
                        id SERIAL PRIMARY KEY,
                        event_name TEXT,
                        date_and_time TEXT,
                        event_description TEXT
                    );''')
    # events.autocommit = True
    cursor.close()

def insert_event( events, event_name, date_and_time, event_description):
    cursor = events.cursor()
    cursor.execute("INSERT INTO events (event_name, date_and_time, event_description) VALUES (%s, %s, %s);",
                   (event_name, date_and_time, event_description))
    # events.commit()
    cursor.close()

@app.route('/collect-data', methods=['POST'])
def collect_data():
    events = create_connection()
    create_table(events)
    eventDeptDict = {'Communications and Engagement':'D/Coms', 'Climate Initiatives':'D/CI', 'Housing and Human Services':'d/hhs', 'Open Space and Mountain Parks':'d/osmp', 'Parks and Recreation':'d/parksrec', 'Public Works':'d/pw',}
    for dept in eventDeptDict.keys():
        url = "https://countmein.bouldercolorado.gov/" + eventDeptDict[dept]  # Adjust the URL accordingly
        html_content = get_html_content(url)
        event_html = html_content.find_all('tr')

        for event_list in event_html:
            event_name_element = event_list.find('a', attrs={"title": "Activity Details"})
            date_time_element = event_list.find('h5', attrs={"class": "margin-top-5"})
            description_element = event_list.find('p')

            # Check if elements are found before calling get_text()
            event_name = event_name_element.get_text().replace('\n', '') if event_name_element else None
            date_time = date_time_element.get_text().replace('\n', '') if date_time_element else None
            description = description_element.get_text().replace('\n', '') if description_element else None

            # Insert data into PostgreSQL table only if all elements are found
            if all((events, event_name, date_time, description)):
                insert_event(events, event_name, date_time, description)

    return "Data collected and stored successfully in PostgreSQL."

@app.route('/events', methods=['GET'])
def get_events():
    print('Getting events data for frontend')
    connection = create_connection()
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM events")
    events = cursor.fetchall()
    events_details = {}
    for i in range(len(events)):
        data = {}
        data['index'] = events[i][0]
        data['event_name'] = events[i][1]
        data['date_and_time'] = events[i][2]
        data['event_description'] = events[i][3]
        events_details[f'event_{i}'] = data
    events = json.dumps(events_details)
    cursor.close()
    connection.close()
    print(type(events))
    return (events)

if __name__ == "__main__": 
    # events = create_connection()
    # create_table(events)
   app.run(host='0.0.0.0', port=5001)
