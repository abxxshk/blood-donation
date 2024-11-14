import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; 
import './LoginSignup.css';

const RegistrationPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); 

    const validateForm = () => {
        const usernameRegex = /^[A-Z][a-zA-Z]*(?: [A-Z][a-zA-Z]*)*$/; 
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; 

        if (!usernameRegex.test(username)) {
            return 'Username must be 3-30 characters long and can only contain letters and numbers.';
        }

        if (!passwordRegex.test(password)) {
            return 'Password must be at least 8 characters long and include uppercase letters, lowercase letters, numbers, and special characters.';
        }

        if (password !== confirmPassword) {
            return 'Passwords do not match.';
        }

        return null; 
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        const validationError = validateForm();
        if (validationError) {
            setError(validationError);
            return;
        }

        try {
            const response = await axios.get('http://localhost:3001/users');
            const existingUser = response.data.find(user => user.username === username);

            if (existingUser) {
                setError('Username already exists');
                return;
            }

            const newUser = { username, password };
            await axios.post('http://localhost:3001/users', newUser);
            setMessage('Registration successful!');
            setUsername('');
            setPassword('');
            setConfirmPassword('');

   
            navigate('/'); 
        } catch (error) {
            console.error('Error registering user:', error);
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div className="registration-container">
            <h1>Register to save someone's life by donating blood</h1>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div>
                    <label>Confirm Password:</label>
                    <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {message && <p style={{ color: 'green' }}>{message}</p>}
                
                <button type="submit">Register</button>
                <p style={{ textAlign: 'center' }}>
                    Already have an account? 
                    <Link to="/" style={{ color: '#114232', marginLeft: '5px' }}>
                        Login here
                    </Link>
                </p>
            </form>

  
        </div>
    );
};

export default RegistrationPage;