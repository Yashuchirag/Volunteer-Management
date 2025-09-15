# Volunteers Management Platform

This project is a full-stack application for managing volunteer events. It includes a **Flask backend**, a **React frontend**, and a **PostgreSQL database** deployed on Heroku. Additionally, it features an automated data collection system for scraping volunteer events from Boulder, Colorado’s public portal.

---

## Table of Contents

* [Features](#features)
* [Tech Stack](#tech-stack)
* [Setup & Installation](#setup--installation)
* [Running the Application](#running-the-application)
* [API Endpoints](#api-endpoints)
* [Event Scraper](#event-scraper)
* [Data Analysis](#data-analysis)
* [Contributing](#contributing)

---

## Features

* User registration and login
* Event registration for users
* Display of upcoming events
* Event participation statistics
* Automated data scraping and insertion into database
* Data analysis of volunteers and events
* RESTful APIs for frontend consumption

---

## Tech Stack

* **Backend:** Python, Flask, Flask-CORS
* **Frontend:** React.js
* **Database:** PostgreSQL (Heroku)
* **Web Scraping:** BeautifulSoup, Requests
* **Task Scheduling:** Python `schedule` library

---

## Setup & Installation

1. **Clone the repository**

```bash
git clone https://github.com/Yashuchirag/Volunteer-Management.git
cd volunteer-management-platform
```

2. **Backend Setup**

```bash
cd backend
python -m venv venv
source venv/bin/activate  # Linux / macOS
venv\Scripts\activate     # Windows
pip install -r requirements.txt
```

3. **Frontend Setup**

```bash
cd frontend
npm install
```

4. **Environment Variables**
   Create a `.env` file in the backend directory and set:

```
DATABASE_URL=postgres://<username>:<password>@<host>:<port>/<database>
PORT=5001
```

---

## Running the Application

### Backend

```bash
cd backend
python app.py
```

The backend will run on `http://localhost:5001`.

### Frontend

```bash
cd frontend
npm start
```

The frontend will run on `http://localhost:3000`.

---

## API Endpoints

### Users

* **POST** `/signup` – Register a new user

  * Body: `{ "email": "user@example.com", "password": "password123" }`

* **POST** `/login` – Login an existing user

  * Body: `{ "email": "user@example.com", "password": "password123" }`

* **GET** `/users` – Get list of all registered users

---

### Events

* **GET** `/events` – Retrieve all valid events

* **POST** `/register` – Register a user for an event

  * Body: `{ "eventId": 1, "email": "user@example.com" }`

* **GET** `/event_stats` – Retrieve event participation statistics

---

### Data Analysis

* **POST** `/analyze-data` – Performs analysis of volunteers and event participation

  * Calculates number of volunteers and event participation
  * Updates `VALID_DATE` field in events table

---

## Event Scraper

* Scrapes volunteer events from [Count Me In Boulder](https://countmein.bouldercolorado.gov/)
* Scheduled to run every 4 hours
* Inserts new events into PostgreSQL
* Checks if event dates are valid (future events are marked as valid)

**Run scraper manually**

```bash
python scraper.py
```

---

## Database Schema

### `users`

| Column   | Type               | Description        |
| -------- | ------------------ | ------------------ |
| user\_id | SERIAL PRIMARY KEY | Unique ID for user |
| email    | TEXT PRIMARY KEY   | User email         |
| password | TEXT               | User password      |

### `events`

| Column             | Type    | Description                       |
| ------------------ | ------- | --------------------------------- |
| event\_id          | SERIAL  | Unique ID for event               |
| event\_name        | TEXT    | Event name                        |
| date               | TEXT    | Event date                        |
| time               | TEXT    | Event time                        |
| event\_description | TEXT    | Description of the event          |
| valid\_date        | INTEGER | 1 if event is upcoming, 0 if past |

### `event_stats`

| Column                          | Type    | Description |
| ------------------------------- | ------- | ----------- |
| event\_id                       | INTEGER | Event ID    |
| user\_id                        | INTEGER | User ID     |
| PRIMARY KEY(event\_id,user\_id) |         |             |

### `analysis_results`

| Column           | Type    | Description      |
| ---------------- | ------- | ---------------- |
| volunteer\_count | INTEGER | Total volunteers |

### `analysis_results_2`

| Column    | Type    | Description            |
| --------- | ------- | ---------------------- |
| event\_id | INTEGER | Event ID               |
| count     | INTEGER | Number of participants |

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/feature_name`)
3. Commit changes (`git commit -m "Add new feature"`)
4. Push to the branch (`git push origin feature/feature_name`)
5. Open a Pull Request

---
