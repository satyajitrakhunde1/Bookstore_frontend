// LoginComponent.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import './styles.css';

const LoginComponent = () => {
    const { setUser } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        const users = JSON.parse(localStorage.getItem('users')) || {};
        const storedUser = users[email];

        if (storedUser && storedUser.password === password) {
            localStorage.setItem('currentUser', JSON.stringify({ email }));
            setUser({ email });
            navigate('/search');
        } else {
            setError('Invalid email or password');
        }
    };

    return (
        <div className="auth-container">
            <h1>Login</h1>
            {error && <p className="error">{error}</p>}
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleLogin}>Login</button>
            <p>
                Don't have an account? <a href="/register">Register</a>
            </p>
        </div>
    );
};

export default LoginComponent;
