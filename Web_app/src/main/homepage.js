import React from 'react';
import './homepage.css';

const Homepage = ({ user, events }) => {
    const parseDateTime = (dateTimeString) => {
        try {
            const parts = dateTimeString.split('|').map(part => part.trim());
            const datePart = parts.find(part => part.match(/\d{2} \w+ \d{4}/)); // Example: matches "24 April 2024"
            const timePart = parts.find(part => part.match(/\d{2}:\d{2} (AM|PM)/)); // Example: matches "10:00 AM"
            
            const date = datePart || 'Date not found';
            const time = timePart || 'Time not found';
            
            return { date, time };
        } catch (error) {
            console.error('Error parsing date and time:', error);
            return { date: 'Invalid date', time: 'Invalid time' };
        }
    };
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
                    </tr>
                </thead>
                <tbody>
                {events.map((event) => {
                        const { date, time } = parseDateTime(event.date_and_time);
                        return (
                            <tr key={event.index}>
                                <td>{event.event_name}</td>
                                <td>{event.event_description}</td>
                                <td>{date}</td>
                                <td>{time}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default Homepage;