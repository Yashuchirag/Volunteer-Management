import React, { useState } from 'react';
import { useRef } from "react";
import "./login.css";

const LoginForm = ({onLogin}) => {
    const email  = useRef(null);
    const password = useRef(null);
    console.log(`Welcome to Volunteer Management Platform login.`)
    let userEmail = "";
    let userPassword = "";
    //const navigate = useNavigate(); 
    //const[action, setAction] = useState("Log in");


    function handleSignup(event) 
    {
        event.preventDefault();
        userEmail = email.current.value;
        userPassword = password.current.value;
        if((userEmail != "" )&& (userPassword != "")){
            console.log(`email id : ${userEmail} Signed up successfully.`)
            alert(`email id : ${userEmail} Signed up successfully.`);
        }
        email.current.value = "";
        password.current.value = "";
    };

    function handleLogin(event)
    {
        event.preventDefault();
        if((email.current.value == userEmail) && (password.current.value == userPassword) &&
           (email.current.value != "") && (password.current.value != "")){
            console.log(`email id : ${userEmail} Logged in successfully.`)
            alert(`email id : ${userEmail} Logged in successfully.`);
            email.current.value = "";
            password.current.value = "";
            onLogin(userEmail);
        }
        else {
            console.log(`Incorrect Login details or user not signed up.`)
            alert(`Incorrect Login details or user not signed up.`);
            email.current.value = "";
            password.current.value = "";
            // . stored email: ${userEmail}, pwd: ${userPassword}, your email: ${email.current.value},pwd: ${password.current.value}
        }
    };

    return (
        <div className = 'container'>
            <div className = 'header'>
                <div className = 'text'>{<b>Volunteer Management Platform</b>}</div>
                <div className = 'underline'></div>
            </div>
            <div className='inputs'>
                <div className='input'>
                    <input type="email" placeholder="Email Id" ref={email}/>
                </div>
                <div className='input'>
                    <input type="password" placeholder="Password" ref = {password}/>
                </div>
            </div>
            <div className="submit-container">
                <div className="submit" onClick={() => handleSignup(event)}>
                    Sign up
                </div>
                <div className="submit" onClick={() => handleLogin(event)}>
                    Log in
                </div>
            </div>

        </div>
    )
}

export default LoginForm;