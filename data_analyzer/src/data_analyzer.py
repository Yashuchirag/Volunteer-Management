from flask import Flask

app = Flask(__name__)

@app.route('/collect-data', methods=['POST'])
def retrieve_data():
    # Add your data collection logic here
    # This function will be called when a POST request is made to /collect-data
    return "Data collected successfully", sql_data

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5002)
