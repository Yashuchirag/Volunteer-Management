import React, { useState } from 'react';
import "./login.css";

const LoginForm = ({ onLogin }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const[action, setAction] = useState("Log in");

    const handleLogin = (e) => {
        e.preventDefault();
        // Here you can add your login logic, such as validating credentials
        // For simplicity, let's just pass the email to the parent component
        onLogin(email);
    };

    return (
        <form onSubmit={handleLogin}>
            <div className = 'container'>
                <div className = 'header'>
                    <div className = 'text'>{<b>Volunteer Management Platform</b>}</div>
                    <div className = 'underline'></div>
                </div>
                <div className='inputs'>
                    <div className='input'>
                        <input type="email" placeholder="Email Id" value={email}
                            onChange={(e) => setEmail(e.target.value)}/>
                    </div>
                    <div className='input'>
                        <input type="password" placeholder="Password" value = {password}
                            onChange={(e) => setPassword(e.target.value)}/>
                    </div>
                </div>
                <div className='button'>
                    <button type="submit">Log in</button>
                </div>
            </div>
        </form>
    );
};

export default LoginForm;