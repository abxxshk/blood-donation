import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Ensure axios is imported
import './BloodDonationForm.css';

const BloodDonationForm = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        age: '',
        gender: '',
        bloodGroup: '',
        contactNumber: '',
        email: '',
        location: '', 
        lastDonationDate: '',
        medicalConditions: '',
    });

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errorMessages, setErrorMessages] = useState({}); 

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const validateForm = () => {
        const errors = {};
        
       
        const nameRegex = /^[A-Z][a-zA-Z]*(?: [A-Z][a-zA-Z]*)*$/; 
        if (!nameRegex.test(formData.fullName)) {
            errors.fullName = 'Enter the Valid Name.';
        }

   
        if (formData.age < 0 || formData.age >= 120) {
            errors.age = 'Enter the Valid Name.';
        }

       
        const contactRegex = /^\d{10}$/; 
        if (!contactRegex.test(formData.contactNumber)) {
            errors.contactNumber = 'Enter the Valid Mobile Number.';
        }

      
        const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,6}$/; 
        if (!emailRegex.test(formData.email)) {
            errors.email = 'Please enter a valid email address.';
        }

      
        const today = new Date();
        const lastDonationDate = new Date(formData.lastDonationDate);
        if (lastDonationDate > today) {
            errors.lastDonationDate = 'Last Donation Date cannot be in the future.';
        }


        const twoMonthsAgo = new Date();
        twoMonthsAgo.setMonth(today.getMonth() - 2);
        
        if (lastDonationDate > twoMonthsAgo) {
            errors.lastDonationDate = 'Last Donation Date must be at least two months ago.';
        }
       

        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
      
        setErrorMessages({});

        // Validate the form
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrorMessages(validationErrors);
            return;
        }

        try {
            await axios.post('http://localhost:3001/donations', {
                ...formData,
                id: Date.now(), // Unique ID for each donation entry
            });
            setIsSubmitted(true);
            clearForm(); // Optionally reset the form fields
        } catch (error) {
            console.error('Error submitting donation:', error);
            setErrorMessages({ general: 'Failed to submit donation. Please try again.' });
        }
    };

    const clearForm = () => {
        setFormData({
            fullName: '',
            age: '',
            gender: '',
            bloodGroup: '',
            contactNumber: '',
            email: '',
            location: '',
            lastDonationDate: '',
            medicalConditions: '',
        });
        
        setErrorMessages({}); // Clear any error messages
    };

    return (
        <div className="form-container">
            <header className="dashboard-header">
                <h1>Blood Donation Application</h1>
                <button className="home-button" onClick={() => navigate('/dashboard')}>Home</button>
                <button onClick={() => navigate('/')}>Logout</button>
            </header>

            {isSubmitted ? (
                <div className="acknowledgment">
                    <h2>Thank you for submitting your application!</h2>
                    <p>We appreciate your willingness to donate blood. We will get in touch with you soon.</p>
                    <button onClick={() => navigate('/donation-history')}>View Donation History</button>
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <h1>Blood Donation Application Form</h1>

                    {/* Form fields */}
                    <label htmlFor="fullName">Full Name:</label>
                    <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
                    {errorMessages.fullName && <p style={{ color: 'red' }}>{errorMessages.fullName}</p>} {/* Display error message */}

                    <label htmlFor="age">Age:</label>
                    <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} required />
                    {errorMessages.age && <p style={{ color: 'red' }}>{errorMessages.age}</p>} {/* Display error message */}

                    <label htmlFor="gender">Gender:</label>
                    <select id="gender" name="gender" value={formData.gender} onChange={handleChange} required>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>

                    <label htmlFor="bloodGroup">Blood Group:</label>
                    <select id="bloodGroup" name="bloodGroup" value={formData.bloodGroup} onChange={handleChange} required>
                        <option value="">Select Blood Group</option>
                        {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(group => (
                            <option key={group} value={group}>{group}</option>
                        ))}
                    </select>

                    <label htmlFor="contactNumber">Contact Number:</label>
                    <input type="tel" id="contactNumber" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required />
                    {errorMessages.contactNumber && <p style={{ color: 'red' }}>{errorMessages.contactNumber}</p>} {/* Display error message */}

                    <label htmlFor="email">Email Address:</label>
                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                    {errorMessages.email && <p style={{ color: 'red' }}>{errorMessages.email}</p>} {/* Display error message */}

                    <label htmlFor="location">Location:</label>
                    <input type="text" id="location" name="location" value={formData.location} onChange={handleChange} required />

                    <label htmlFor="lastDonationDate">Last Donation Date:</label>
                    <input type="date" id="lastDonationDate" name="lastDonationDate" value={formData.lastDonationDate} onChange={handleChange} required />
                    {errorMessages.lastDonationDate && <p style={{ color: 'red' }}>{errorMessages.lastDonationDate}</p>} {/* Display error message */}

                    <label htmlFor="medicalConditions">Medical Conditions:</label>
                    <textarea id="medicalConditions" name="medicalConditions" rows="4" value={formData.medicalConditions} onChange={handleChange}></textarea>

                    {/* General Error Messages */}
                    {errorMessages.general && (
                        <p style={{ color: 'red' }}>{errorMessages.general}</p> 
                    )}

                    {/* Button Container for Submit and Clear */}
                    <div className="button-container">
                        <button type="submit">Submit</button>
                        <button type="button" onClick={clearForm}>Clear Form</button> {/* Clear Form Button */}
                    </div>
                </form>
            )}
        </div>
    );
};

export default BloodDonationForm;