from flask import Flask, request, jsonify
import psycopg2
import numpy as np
import datetime

app = Flask(__name__)

# Database connection parameters
# DB_PARAMS = {
#     'user': 'postgres',
#     'password': 'postthis9317',
#     'host': 'localhost',
#     'port': '5432',
#     'database': 'Volunteer_Management'
# }

def create_connection():
    try:
        #Connecting to Heroku Postgres
        database_url = 'postgres://kwkduxwxgqawim:251a81fb1d17b679565b576b48b8f520f46e5e85ba269d5d4e29e8df247d4ba0@ec2-23-22-172-65.compute-1.amazonaws.com:5432/d2isdsq00u30bg'
        default_connection = psycopg2.connect(database_url, sslmode='require')
        default_connection.autocommit= True
        print("database connection successful")
        return default_connection
    except:
        print("Database connection unsuccessful.")
        return None

@app.route('/analyze-data', methods=['POST'])
def analyze_data():
    # Connect to the PostgreSQL database
    connection = create_connection()#psycopg2.connect(**DB_PARAMS)
    cursor = connection.cursor()
    # cursor2 = connection.cursor()

    try:
        # Fetch data from the database table
        cursor.execute("SELECT COUNT(EMAIL) FROM VOLUNTEER_TABLE_TEST;")
        volunteer_count = cursor.fetchall()[0][0]

        cursor.execute("SELECT DATE, VALID_DATE from EVENT_LIST;")
        event_data = cursor.fetchall()

        # Check if data is retrieved
        if not volunteer_count:
            return jsonify({"error": "No data retrieved from the login database"}), 400
        
        if not event_data:
            return jsonify({"error": "No data retrieved from the event sign up database"}), 400
        
        dates = [row[0] for row in event_data]
        valid_dates = [row[1] for row in event_data]

        # Perform data analysis and store result in database
        store_valid_date(cursor, dates, valid_dates)
        store_analysis_result(cursor, volunteer_count)

        # Commit changes to the database
        connection.commit()

        return jsonify({"message": "Analysis result stored successfully in the database"}), 200

    except Exception as e:
        connection.rollback()
        return jsonify({"error": f"Error retrieving or storing data: {e}"}), 500

    finally:
        # Close cursor and connection
        cursor.close()
        connection.close()

def store_analysis_result(cursor_analysis, vol_count, sign_up_tups):    
    # Store analysis result in database table
    cursor_analysis.execute("INSERT INTO analysis_results (volunteer_count) VALUES (%s);", (vol_count))

def store_valid_date(cursor_analysis, dates, valid_date):
    # Check if the event date is in the future
    current_date = datetime.now().date()

    for event_date in dates:
        event_date = datetime.strptime(event_date, "%d %B %Y").date()
        if event_date >= current_date:
            # If the event date is in the future, set VALID_DATE to 1
            cursor_analysis.execute("UPDATE EVENT_LIST SET VALID_DATE = 1 WHERE TO_DATE(DATE, 'DD Month YYYY') = %s", (event_date,))
        else:
            # If the event date is in the past, set VALID_DATE to 0
            cursor_analysis.execute("UPDATE EVENT_LIST SET VALID_DATE = 0 WHERE TO_DATE(DATE, 'DD Month YYYY') = %s", (event_date,))

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5002)
