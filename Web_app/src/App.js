// App.js
import React, { useState } from 'react';
import LoginForm from './login';
import Homepage from './homepage';
import './App.css';

const App = () => {
    const [loggedInUser, setLoggedInUser] = useState(null);

    const events = [
        {
            name: 'Pilot Event',
            description: 'Getting the event started for Volunteers Management platform',
            date: '04/10/2024',
            time: '9:00 pm',
            volunteersNeeded: 4
        },
        {
            name: 'Pilot Event',
            description: 'Getting the event started for Volunteers Management platform',
            date: '04/10/2024',
            time: '9:00 pm',
            volunteersNeeded: 4
        },
        {
            name: 'Pilot Event',
            description: 'Getting the event started for Volunteers Management platform',
            date: '04/10/2024',
            time: '9:00 pm',
            volunteersNeeded: 4
        },
        {
            name: 'Pilot Event',
            description: 'Getting the event started for Volunteers Management platform',
            date: '04/10/2024',
            time: '9:00 pm',
            volunteersNeeded: 4
        },
        {
            name: 'Pilot Event',
            description: 'Getting the event started for Volunteers Management platform',
            date: '04/10/2024',
            time: '9:00 pm',
            volunteersNeeded: 4
        },
        // Add more event objects as needed
    ];

    const handleLogin = (email) => {
        // Here you can perform authentication logic
        // For simplicity, let's just set the logged-in user
        const username = email.split('@')[0];
        setLoggedInUser(username);
    };

    return (
        <div>
            {loggedInUser ? (
                <Homepage user={loggedInUser} events = {events}/>
            ) : (
                <LoginForm onLogin={handleLogin} />
            )}
        </div>
    );
};

export default App;
