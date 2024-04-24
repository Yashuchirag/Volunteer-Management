// App.js
import React, { useState } from 'react';
import LoginForm from './login';
import Homepage from './homepage';
import './App.css';

const App = () => {
    const [loggedInUser, setLoggedInUser] = useState(null);
    
    // This is the new code which will fetch details from database
    const [events, setEvents] = useState(null);

    const fetchEvents = async () => {
        try {
            alert("Fetching events");
            const response = await fetch('localhost:5001/events');
            alert("Fetched events");
            alert("response",response);
            if (response.ok) {
                alert("Response is good");
                const eventData = await response.json();
                setEvents(eventData); // Update events state with fetched data
            } else {
                alert("Failed to fetch events");
                console.error('Failed to fetch events');
            }
        } catch (error) {
            alert('Error fetching events:', error);
            console.error('Error fetching events:', error);
        }
    };

    // This is the older code with hardcoded events
    // const events = [
    //     {
    //         name: 'Pilot Event',
    //         description: 'Getting the event started for Volunteers Management platform',
    //         date: '04/18/2024',
    //         time: '6:00 pm',
    //         volunteersNeeded: 4
    //     },
    //     {
    //         name: 'Community Cleanup Day',
    //         description: 'Join us for a community cleanup event to keep our neighborhood clean and beautiful.',
    //         date: '04/19/2024',
    //         time: '10:00 am',
    //         volunteersNeeded: 10
    //     },
    //     {
    //         name: 'Children\'s Charity Fun Fair',
    //         description: 'Help make a difference in the lives of children by volunteering at our charity fun fair. Fun games, food, and entertainment for a good cause!',
    //         date: '04/20/2024',
    //         time: '11:00 am',
    //         volunteersNeeded: 20
    //     },    
    //     {
    //         name: 'Environmental Awareness Workshop',
    //         description: 'Join us for an educational workshop on environmental conservation and sustainability. Learn how you can contribute to protecting our planet.',
    //         date: '04/25/2024',
    //         time: '2:00 pm',
    //         volunteersNeeded: 15
    //     },
    //     {
    //         name: 'Animal Shelter Adoption Event',
    //         description: 'Help find loving homes for shelter animals by volunteering at our adoption event. Spend time with adorable pets and assist potential adopters.',
    //         date: '04/30/2024',
    //         time: '1:00 pm',
    //         volunteersNeeded: 8
    //     },   
    //     {
    //         name: 'Senior Citizen Social Hour',
    //         description: 'Brighten the day of our senior citizens by volunteering at our social hour event. Engage in conversation, play games, and spread joy!',
    //         date: '05/05/2024',
    //         time: '3:00 pm',
    //         volunteersNeeded: 12
    //     },
    // ];

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
                <Homepage user={loggedInUser} events = {events}/>
            ) : (
                <LoginForm onLogin={handleLogin} />
            )}
        </div>
    );
};

export default App;
