import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import './Login.css'
import axios from "axios";

const Signup = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate()
    const sign = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        setError("");

        console.log('Username:', username);
        console.log('Email:', email);
        console.log('Password:', password);

       const data= await axios.post('http://localhost:3000/api/signUp',{
            username:username,
            email:email,
            password:password
        })

        console.log(data,'axios data');

        localStorage.setItem("token",data.data.token)
        navigate('/')

    }

    return (
        <div className="container">
            <h1 className="blog-title">Elite Quill</h1>
            <div className="wrapper">
                <form className="login-form" onSubmit={sign}>
                    <h2>Sign Up</h2>
                    {error && <div className="error-message">{error}</div>}
                    <div className="input-group">
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            type="text"
                            placeholder="yourusername"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="your.email@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input
                            id="confirm-password"
                            type="password"
                            placeholder="••••••••"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button onClick={sign} type="submit">Create Account</button>
                    <div className="signup-link">
                        Already a member? <Link to="/">Log In</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup;
