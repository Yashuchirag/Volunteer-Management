from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup
import psycopg2
import json
import re
import schedule
import time

app = Flask(__name__)
CORS(app)

def create_connection():
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

def create_events_table(connection):
    cursor = connection.cursor()
    # Adjust the table schema as per your requirements
    cursor.execute('''CREATE TABLE IF NOT EXISTS events (
                        id SERIAL PRIMARY KEY,
                        event_name TEXT,
                        date TEXT,
                        time TEXT,
                        event_description TEXT,
                        valid_date INTEGER
                    );''')
    # events.autocommit = True
    cursor.close()

def create_users_table(connection):
    cursor = connection.cursor()
    # Adjust the table schema as per your requirements
    cursor.execute('''CREATE TABLE IF NOT EXISTS users (
                        id SERIAL not null,
                        email TEXT primary key,
                        password TEXT not null
                    );''')
    # events.autocommit = True
    cursor.close()

@app.route('/events', methods=['GET'])
def get_events():
    print('Getting events data for frontend')
    connection = create_connection()
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM events where valid_date = 1")
    events = cursor.fetchall()
    events_details = {}
    for i in range(len(events)):
        data = {}
        data['index'] = events[i][0]
        data['event_name'] = events[i][1]
        data['date'] = events[i][2]
        data['time'] = events[i][3]
        data['event_description'] = events[i][4]
        events_details[f'event_{i}'] = data
    events = json.dumps(events_details)
    cursor.close()
    connection.close()
    return (events)

@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    # Check if user already exists in the database
    connection = create_connection()
    create_users_table(connection)
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
    user = cursor.fetchone()
    if user:
        print('User already exists')
        return jsonify({'message': 'User already exists'}), 400
    else:
        # Insert new user into the database
        cursor.execute("INSERT INTO users (email, password) VALUES (%s, %s)", (email, password))
        print('User created successfully')
        return jsonify({'message': 'User created successfully'}), 201
    
@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    connection = create_connection()
    create_users_table(connection)
    cursor = connection.cursor()
    cursor.execute("SELECT * FROM users WHERE email = %s AND password = %s", (email, password))
    user = cursor.fetchone()
    if user:
        return jsonify({'message': 'Login successful'}), 200
    else:
        return jsonify({'message': 'Invalid credentials'}), 401

if __name__ == "__main__": 
    app.run(host='0.0.0.0', port=5001)