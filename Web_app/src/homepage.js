import React from 'react';

const Homepage = ({ user }) => {
    return (
        <div>
            <div className="heading">Welcome, {user}! </div>
            <div className="body">You are logged in.</div>
        </div>
    );
};

export default Homepage;