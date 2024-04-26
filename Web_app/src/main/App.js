// App.js
import React, { useState, useEffect } from 'react';
import LoginForm from './login';
import Homepage from './homepage';
import './App.css';

const App = () => {
    const [loggedInUser, setLoggedInUser] = useState(null);
    const [events, setEvents] = useState([]);
    const [error, setError] = useState('');

    const fetchEvents = async () => {
        try {
            alert("Fetching events");
            const response = await fetch('http://localhost:5001/events');
            alert("Fetched events");
            if (response.ok) {
                const eventData = await response.json();
                alert("Fetching 1 event");
                // Transform the object into an array
                const eventsArray = Object.keys(eventData).map(key => {
                    return {
                        ...eventData[key],
                        id: key, // Add the key as an id to the event object
                    };
                });
                setEvents(eventsArray); // Update events state with fetched data
                
            } else {
                setError(`Failed to fetch events with status: ${response.status}`);
            }
        } catch (error) {
            setError(`Error fetching events: ${error.message}`);
        }
    };

    useEffect(() => {
        console.log(events); // This will log whenever events is updated
    }, [events]);

    const handleLogin = (email) => {
        // Here you can perform authentication logic
        // For simplicity, let's just set the logged-in user
        const username = email.split('@')[0];
        setLoggedInUser(username);
        fetchEvents();
    };

    return (
        <div>
            {loggedInUser ? (
                <Homepage user={loggedInUser} events={events} />
            ) : (
                <LoginForm onLogin={handleLogin} />
            )}
            {error && <div className="error">{error}</div>}  // Display errors if any
        </div>
    );
};

export default App;
