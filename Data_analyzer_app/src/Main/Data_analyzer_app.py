from flask import Flask, request, jsonify
import psycopg2

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

    try:
        # Fetch data from the database table
        cursor.execute("SELECT * FROM your_table_name;")
        data = cursor.fetchall()

        # Check if data is retrieved
        if not data:
            return jsonify({"error": "No data retrieved from the database"}), 400

        # Perform data analysis and store result in database
        store_analysis_result(cursor, data)

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

def store_analysis_result(cursor, data):
    # Implement your data analysis logic here
    # This is a placeholder; you can replace it with your actual analysis code
    
    # Example: Calculate the average value of a numerical field
    # Assuming the data contains numerical values in the second column
    values = [entry[1] for entry in data if entry[1] is not None]
    average_value = sum(values) / len(values) if values else 0
    
    # Store analysis result in database table
    cursor.execute("INSERT INTO analysis_results (average_value, total_entries) VALUES (%s, %s);", (average_value, len(data)))

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5002)
