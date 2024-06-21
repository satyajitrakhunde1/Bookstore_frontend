
import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../App';
import './styles.css';

const LoginComponent = () => {
    const { setUser } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = () => {
        setError('');

        // Check if the user is trying to login as admin
        if (email === 'admin@gmail.com' && password === 'admin') {
            // Set admin user in context or local storage
            setUser({ email: 'admin@gmail.com', role: 'admin' });

            // Redirect to admin dashboard or any admin-specific route
            navigate('/admin/books');
            return;
        }

        // If not admin, proceed with regular user login
        loginUser(email, password);
    };

    const loginUser = async (email, password) => {
        try {
            if (!email || !password) {
                throw new Error('Please fill in all fields');
            }

            const response = await fetch(`${process.env.REACT_APP_API_BASE_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Login failed');
            }

            const data = await response.json();
            const { token } = data; // Assuming your API response includes a token

            // Store the user info and token in context or local storage
            setUser({ email, token });

            // Redirect to the search page or any other authorized route
            navigate('/search');
        } catch (error) {
            setError(error.message);
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
                Don't have an account? <Link to="/register">Register</Link>
            </p>
            <hr style={{color:"gray"}}/>
            <p style={{color:"green"}}>Login as Admin (Email:admin@gmail.com ,Password: admin)</p>
        </div>
    );
};

export default LoginComponent;
