import React, { useState, useRef } from 'react';
import "./login.css";

const LoginForm = ({ onLogin }) => {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setUserPassword] = useState("");
    const [message, setMessage] = useState(""); // For user feedback

    const handleSignup = (event) => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        if (email && password) {
            // setUserEmail(email);
            // setUserPassword(password);
            // setMessage(`Email: ${email} signed up successfully.`);
            // console.log(`Email: ${email} signed up successfully.`);
            fetch('http://localhost:5001/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })
            .then(response => {
                return response.json();
              })
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                    setMessage(data.error);
                }
                else {
                    emailRef.current.value = "";
                    passwordRef.current.value = "";
                    console.log(data.message);
                    setMessage(data.message);
                }
            })
            .catch(error => {
                console.error(error);
                alert('Error registering the user. Please try again.');
            });
        } else {
            alert("Email and password is missing.");
        }
        emailRef.current.value = "";
        passwordRef.current.value = "";
    };

    const handleLogin = (event) => {
        event.preventDefault();
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        var status = 0;
        // if (email === userEmail && password === userPassword && email && password) {
        //     console.log(`Email: ${email} logged in successfully.`);
        //     setMessage(`Email: ${email} logged in successfully.`);
        //     onLogin(email); // Call the passed `onLogin` function to update the app's state
        if (email && password) {
            fetch('http://localhost:5001/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            })
            .then(response => {
                status = response.status;
                return response.json();
            })
            .then(data => {
                if (data.error) {
                    console.log(data.error);
                    setMessage(data.error);
                }
                else {
                    emailRef.current.value = "";
                    passwordRef.current.value = "";
                    console.log(data.message);
                    setMessage(data.message);
                    if (status == 200){
                        onLogin(email);
                    }
                }
            })
            .catch(error => {
                console.error(error);
                alert('Error logging in the user. Please try again.');
            });
            // if (response.ok) {
            //     setMessage(`Email: ${email} logged in successfully.`);
            //     onLogin(email);
            // } else {
            //     setMessage('Incorrect login details or user not signed up.');
            // }
    
        } else {
            setMessage("Incorrect login details or user not signed up.");
            console.log("Incorrect login details or user not signed up.");    
        }
        emailRef.current.value = "";
        passwordRef.current.value = "";
    };

    return (
        <div className='container'>
            <div className='header'>
                <div className='text'><b>Volunteer Management Platform</b></div>
                <div className='underline'></div>
            </div>
            {message && <div className='message'>{message}</div>} {/* Display feedback message */}
            <div className='inputs'>
                <div className='input'>
                    <input type="email" placeholder="Email Id" ref={emailRef} />
                </div>
                <div className='input'>
                    <input type="password" placeholder="Password" ref={passwordRef} />
                </div>
            </div>
            <div className="submit-container">
                <div className="submit" onClick={handleSignup}>Sign up</div>
                <div className="submit" onClick={handleLogin}>Log in</div>
            </div>
        </div>
    );
}

export default LoginForm;
