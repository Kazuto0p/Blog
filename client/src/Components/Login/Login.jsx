import React, { useState } from "react";
import { Link } from "react-router-dom";
import './Login.css'

const Login = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error, setError] = useState('');
    
    const login = () =>{
        e.preventDefault();
    }

    return (
        <div className="container">
            <h1 className="blog-title">Elite Quill</h1>
            <div className="wrapper">
                <form className="login-form">
                    <h2>Sign In</h2>
                    <div className="error-message"></div>
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
                    <div className="forgot-password">
                        <Link to="/forgot-password">Forgot Password?</Link>
                    </div>
                    <button onClick={login} type="submit">Log In</button>
                    <div className="signup-link">
                        New to the platform? <Link to="/signup">Sign Up</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login