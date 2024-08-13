import React from 'react';
import '/public/Style.css';
function login() {
    return (
        <div className = "login-container">
            <div className="hospital-logo">
                    <img src="./images/logo.jpg" alt="Government Hospital Logo" />
            </div>
            <form id="login-form">
                <input type="text" id="username" placeholder="Username or Email" required />
                <input type="password" id="password" placeholder="Password" required />
                <button type="submit">Log In</button>
                <br/>
                <a href="#" className="forgot-password">Forgot Password?</a>
            </form>
            <br/>
        </div>
    );
}

export default login;
