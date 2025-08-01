import React, { useState } from 'react';
import '../assets/Login.css';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!email || !password) {
            alert('Please fill out both fields');
            return;
        }
        // Handle the login logic here
        console.log('Email:', email);
        console.log('Password:', password);
    };

    return (
        <div className="loginbody">
            <div className="logincontainer">
                <div className="loginform-container sign-in-container">
                    <form className="loginform" onSubmit={handleSubmit}>
                        <h1 className="login-title">Login</h1>
                        <input
                            className="login-email"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            className="login-password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button className="login-button" type="submit">
                            Sign In
                        </button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-right">
                            <h1 className="welcome-text">Welcome Back!</h1>
                            <p className="welcome-p">
                                To stay connected with us please login with your personal info
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
