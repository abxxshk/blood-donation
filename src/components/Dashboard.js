import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleDonateBlood = () => {
        navigate('/blood-donation');
    };

    const handleRequirement =() =>{
        navigate('/blood-request');
    }

    
    const bloodRequests = [
        { id: 1, name: 'Sivakumaran', bloodGroup: 'A+', location: 'APOLLO ' },
        { id: 2, name: 'Sabarish', bloodGroup: 'O-', location: 'GKNM'       },
        { id: 3, name: 'Muthu karthik', bloodGroup: 'B+', location: 'KMCH'  },
        { id: 3, name: 'Muthu karthik', bloodGroup: 'B+', location: 'KMCH'  }, 
       
        
       
    ];

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Blood Donation Application</h1>
                <button onClick={() => navigate('/dashboard')}>Home</button>
                <button ><a href='#ABOUTUS'>About us</a></button>
                <button onClick={() => navigate('/donation-history')}>History</button>
                <button onClick={() => navigate('/')}>logout</button>

            </header>
            <main className="dashboard-main">
                <div className="left-section">
                    <div className='blood-item1'>
                        <h2>Are you seeking for blood</h2>
                        <button className="donate-blood-button" onClick={handleRequirement}>Need Blood</button>
                    </div>
                    <div className='blood-item2'>
                        <h2>Are you Interested to donate your blood and save someones life</h2>
                        <button className="donate-blood-button" onClick={handleDonateBlood}>Donate Blood</button>
                    </div>

                </div>
                <div className="right-section">
                    <section className="blood-requests-section">
                        <h2>Blood Requests</h2>
                        <ul className="blood-requests-list">
                            {bloodRequests.map(request => (
                                <li key={request.id} className="blood-request-item">
                                    <div>
                                        <p><strong>Name:</strong> {request.name}</p>
                                        <p><strong>Blood Group:</strong> {request.bloodGroup}</p>
                                        <p><strong>Location:</strong> {request.location}</p>
                                    </div>
                                    <button className="donate-blood-button" onClick={handleDonateBlood}>Donate Blood</button>
                                </li>
                            ))}
                        </ul>
                    </section>
                </div>
            </main>
            <div className='about' id='ABOUTUS'>
                <h1>About Us:</h1>
                <h2>Welcome to our Blood Donation Application, a platform dedicated to connecting blood donors with those in need. Our mission is to create a reliable, efficient, and compassionate network that bridges the gap between generous donors and individuals who require life-saving blood donations.</h2>
                <h1>Features:</h1>
                <h2>1.)User Registration & Login</h2>
                <h2>2.)Recipient Requests</h2>
                <h2>3.)Blood Requests Matching</h2>
                <h2>4.)Real-Time Notifications</h2>
                <h2>5.)Donation History Tracking</h2>
                <h2>6.)Nearby Blood Banks & Hospitals</h2>
            </div>
        </div>
    );
};

export default Dashboard;
