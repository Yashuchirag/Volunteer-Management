from flask import Flask
import requests
from bs4 import BeautifulSoup
import re


app = Flask(__name__)

@app.route('/collect-data', methods=['POST'])
def collect_data():
    # Add your data collection logic here
    # This function will be called when a POST request is made to /collect-data
    return "Data collected successfully"

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5001)
