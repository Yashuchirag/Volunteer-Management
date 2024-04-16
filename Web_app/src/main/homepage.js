import React from 'react';
import './homepage.css';

const Homepage = ({ user, events }) => {
    return (
        <div className="homepage-container">
            <div className="heading">Welcome, {user}! </div>
            <div className="subtitle">List of Events:</div>
            <table className="event-table">
                <thead>
                    <tr>
                        <th>Event Name</th>
                        <th>Event Description</th>
                        <th>Event Date</th>
                        <th>Event Time</th>
                        <th>Volunteers needed</th>
                    </tr>
                </thead>
                <tbody>
                    {events.map((event, index) => (
                        <tr key={index}>
                            <td>{event.name}</td>
                            <td>{event.description}</td>
                            <td>{event.date}</td>
                            <td>{event.time}</td>
                            <td>{event.volunteersNeeded}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Homepage;