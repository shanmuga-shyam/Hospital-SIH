import React, { useState } from 'react';
import '/public/Style-reg.css';
import axios from 'axios';

function Register() {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [location, setLocation] = useState("");
    const [contact, setContact] = useState("");
    const [sector, setSector] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault(); 

        if (password !== confirmpassword) {
            alert("Passwords do not match!");
            return;
        }
        if (username == password){
            alert("give a strong password not as in name")
            return;
        
        }
        const formData = {
            username,
            password,
            location,
            contact,
            sector,
        };
        console.log(username,password,location,contact,sector,BACKEND_URL)
        if (contact.toString().length >=11){
            alert("not a valid phone number");
            return;
        }
        axios.post(`${BACKEND_URL}/hospital/register`, formData)
            .then(response => {
                console.log("Registration successful:", response.data);
                alert("Registration successful!");
            })
            .catch(error => {
                console.error("There was an error registering the hospital:", error);
                alert("Registration failed. Please try again.");
            });
    };

    return (
        <div>
            <div className="register-container">
                <div className="hospital-logo">
                    <img src="./images/logo.jpg" alt="Government Hospital Logo" />
                </div>
                <h1>Register for Government Hospital Portal</h1>
                <form onSubmit={handleSubmit}>
                    <input 
                        type="text" 
                        placeholder="Username" 
                        value={username} 
                        onChange={(e) => setUserName(e.target.value)} 
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        required 
                    />
                    <input 
                        type="password" 
                        placeholder="Confirm Password" 
                        value={confirmpassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        required 
                    />
                    <input 
                        type="text" 
                        placeholder="Location" 
                        value={location} 
                        onChange={(e) => setLocation(e.target.value)} 
                        required 
                    />
                    <input 
                        type="number" 
                        placeholder="Phone Number" 
                        value={contact} 
                        onChange={(e) => setContact(e.target.value)} 
                        required 
                    />
                    <select 
                        value={sector} 
                        onChange={(e) => setSector(e.target.value)} 
                        required
                    >
                        <option id ="sector" style={{color : "white"}} value="" disabled selected hidden>Choose a sector:</option>
                        <option id = "sector1" value="Private">Private</option>
                        <option id = "sector1" value="Government">Government</option>
                    </select>
                    
                    <button type="submit">Register</button>
                </form>
            </div>
        </div>
    );
}

export default Register;
