from flask import Flask, request, jsonify
import psycopg2
import numpy as np

app = Flask(__name__)

# Database connection parameters
DB_PARAMS = {
    'user': 'postgres',
    'password': 'postthis9317',
    'host': 'localhost',
    'port': '5432',
    'database': 'Volunteer_Management'
}

@app.route('/analyze-data', methods=['POST'])
def analyze_data():
    # Connect to the PostgreSQL database
    connection = psycopg2.connect(**DB_PARAMS)
    cursor = connection.cursor()
    # cursor2 = connection.cursor()

    try:
        # Fetch data from the database table
        cursor.execute("SELECT COUNT(EMAIL) FROM VOLUNTEER_TABLE_TEST;")
        volunteer_count = cursor.fetchall()[0][0]

        cursor.execute("SELECT REQUIRED_VOLUNTEER_COUNT, NO_SIGN_UPS FROM EVENT_LIST;")
        sign_up_tuples = cursor.fetchall()

        # Check if data is retrieved
        if not volunteer_count:
            return jsonify({"error": "No data retrieved from the login database"}), 400
        
        if not sign_up_tuples:
            return jsonify({"error": "No data retrieved from the event sign up database"}), 400

        # Perform data analysis and store result in database
        store_analysis_result(cursor, volunteer_count, sign_up_tuples)

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
    # Implement your data analysis logic here
    # This is a placeholder; you can replace it with your actual analysis code
    
    avg_sign_ups_per_event = [second_column / first_column for first_column, second_column in sign_up_tups]
    avg_sign_up = np.mean(avg_sign_ups_per_event)
    
    # Store analysis result in database table
    cursor_analysis.execute("INSERT INTO analysis_results (volunteer_count, average_sign_ups_per_event, avg_sign_up) VALUES (%s, %s, %s);", (vol_count, avg_sign_ups_per_event, avg_sign_up))

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5002)
