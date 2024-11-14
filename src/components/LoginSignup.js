// src/components/LoginSignup.js
import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import './LoginSignup.css';

const LoginSignup = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    // Fetch users from db.json
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:3001/users');
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isLogin) {
            // Check if username and password match any user
            const user = users.find(user =>
                user.username === formData.username && user.password === formData.password
            );
            if (user) {
                navigate('/dashboard');
            } else {
                alert('Invalid username or password');
            }
        } else {
            // Switch to signup form
            setIsLogin(false);
        }
    };

    return (
        <div className="login-signup-container">
            <h1>Login to save someone's life by donating blood</h1>
            <form onSubmit={handleSubmit}>
                <h1>{isLogin ? 'Login' : 'Signup'}</h1>
                <label htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} required />

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />

                <button type="submit">{isLogin ? 'Login' : 'Signup'}</button>
                <p>
                    {isLogin ? "Don't have an account?" : 'Already have an account?'}
                    <Link to="/register" style={{ color: '#114232' }}>
                        {isLogin ? ' Signup here' : ' Login here'}
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default LoginSignup;