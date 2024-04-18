import React from 'react';
import './homepage.css';

const Homepage = ({ user, events }) => {
    return (
        <div className="homepage-container">
            <div className="heading">Welcome, {user}! </div>
            <div className="subtitle"><b>Upcoming Events:</b></div>
            <table className="event-table">
                <thead>
                    <tr>
                        <th style={{ width: '5cm' }}>Event Name</th>
                        <th style={{ width: '10cm' }}>Event Description</th>
                        <th style={{ width: '2.5cm' }}>Event Date</th>
                        <th style={{ width: '2.5cm' }}>Event Time</th>
                        <th style={{ width: '3.5cm' }}>Volunteers needed</th>
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