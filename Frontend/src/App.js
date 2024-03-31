// App.js
import React, { useState } from 'react';
import LoginForm from './login';
import './App.css';

const App = () => {
    const [loggedInUser, setLoggedInUser] = useState(null);

    const handleLogin = (email) => {
        // Here you can perform authentication logic
        // For simplicity, let's just set the logged-in user
        const username = email.split('@')[0];
        setLoggedInUser(username);
    };

    return (
        <div>
            {loggedInUser ? (
                <>
                <div className="heading">Welcome, {loggedInUser}! </div>
                <div className="body">You are logged in.</div>
                </>
            ) : (
                <LoginForm onLogin={handleLogin} />
            )}
        </div>
    );
};

export default App;
