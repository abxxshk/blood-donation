import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginSignup from './components/LoginSignup';
import RegistrationPage from './components/RegistrationPage';
import Dashboard from './components/Dashboard';
import BloodDonationForm from './components/BloodDonationForm';
import BloodRequirement from './components/BloodRequirement';
import DonationHistory from './components/DonationHistory'; // Import the new component

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginSignup />} />
                <Route path="/register" element={<RegistrationPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/blood-donation" element={<BloodDonationForm />} />
                <Route path="/blood-request" element={<BloodRequirement />} />
                <Route path="/donation-history" element={<DonationHistory />} /> {/* New route */}
            </Routes>
        </Router>
    );
}

export default App;