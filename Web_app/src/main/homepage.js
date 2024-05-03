import React from 'react';
import './homepage.css';

const Homepage = ({ user, events }) => {
    // const parseDateTime = (dateTimeString) => {
    //     try {
    //         const parts = dateTimeString.split('|').map(part => part.trim());
    //         const datePart = parts.find(part => part.match(/\d{2} \w+ \d{4}/)); // Example: matches "24 April 2024"
    //         const timePart = parts.find(part => part.match(/\d{2}:\d{2} (AM|PM)/)); // Example: matches "10:00 AM"
            
    //         const date = datePart || 'Date not found';
    //         const time = timePart || 'Time not found';
            
    //         return { date, time };
    //     } catch (error) {
    //         console.error('Error parsing date and time:', error);
    //         return { date: 'Invalid date', time: 'Invalid time' };
    //     }
    // };
    return (
        <div className="homepage-container">
            <div className="heading">Volunteer Management Platform </div>
            <div className="title">Welcome, {user}! </div>
            <div className="subtitle"><b>Upcoming Events:</b></div>
            <div className="event-cards">
                {events.map((event, index) => {
                    // const { date, time } = parseDateTime(event.date_and_time);
                    return (
                        <div className="event-card" key={index}>
                            <div className="event-name">{event.event_name}</div>
                            <div className="event-description">{event.event_description}</div>
                            <div className="event-date-time">{`${event.date} - ${event.time}`}</div>
                            {/* <div className="event-date">{date}</div>
                            <div className="event-time">{time}</div> */}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Homepage;