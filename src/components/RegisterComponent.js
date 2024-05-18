// RegisterComponent.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';
import './styles.css';

const RegisterComponent = () => {
    const { setUser } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleRegister = () => {
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        const users = JSON.parse(localStorage.getItem('users')) || {};
        if (users[email]) {
            setError('Email already registered');
            return;
        }

        users[email] = { email, password };
        localStorage.setItem('users', JSON.stringify(users));
        localStorage.setItem('currentUser', JSON.stringify({ email }));
        setUser({ email });
        navigate('/search');
    };

    return (
        <div className="auth-container">
            <h1>Register</h1>
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
            <button onClick={handleRegister}>Register</button>
            <p>
                Already have an account? <a href="/">Login</a>
            </p>
        </div>
    );
};

export default RegisterComponent;
