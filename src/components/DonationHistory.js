import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DonationHistory.css';
import { useNavigate } from 'react-router-dom';

const DonationHistory = () => {
    const navigate = useNavigate();
    const [donations, setDonations] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDonations = async () => {
            try {
                const response = await axios.get('http://localhost:3001/donations');
                setDonations(response.data);
            } catch (error) {
                console.error('Error fetching donation history:', error);
                setError('Failed to load donation history.');
            }
        };

        fetchDonations();
    }, []);

    return (
        <div className="donation-history-container">
            <header className="dashboard-header">
                <h1>Blood Donation Application</h1>
                <button onClick={() => navigate('/dashboard')}>Home</button>
                <button onClick={() => navigate('/')}>Logout</button>
            </header>
            <h2>Donation History</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {donations.length === 0 ? (
                <p>No donation history found.</p>
            ) : (
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Name</th>
                            <th>Blood Group</th>
                            <th>Location</th>
                            <th>Result</th> {/* New column for Result */}
                        </tr>
                    </thead>
                    <tbody>
                        {donations.map(donation => (
                            <tr key={donation.id}>
                                <td>{new Date(donation.lastDonationDate).toLocaleDateString()}</td>
                                <td>{donation.fullName}</td>
                                <td>{donation.bloodGroup}</td>
                                <td>{donation.location}</td>
                                <td>{donation.lastDonationDate ? 'Donated' : 'Requested'}</td> 
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default DonationHistory;