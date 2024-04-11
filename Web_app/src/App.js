// App.js
import React, { useState } from 'react';
import LoginForm from './login';
import Homepage from './homepage';
import './App.css';

const App = () => {
    const [loggedInUser, setLoggedInUser] = useState(null);

    const handleLogin = (email) => {
        // Here you can perform authentication logic
        // For simplicity, let's just set the logged-in user
        const username = email.split('@')[0];
        setLoggedInUser(email);
    };

    return (
        <div>
            {loggedInUser ? (
                <Homepage user={loggedInUser} />
            ) : (
                <LoginForm onLogin={handleLogin} />
            )}
        </div>
    );
};

export default App;
