import React from 'react';
import { useUser } from '../../contexts/UserContext.jsx';
import '../Dashboard.css';

const CustomerDashboard = () => {
    const { user } = useUser();

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h1>Customer Dashboard</h1>
                <p>Welcome back, {user.name}!</p>
            </header>

            <div className="dashboard-stats">
                <div className="stat-card">
                    <h3>My Reservations</h3>
                    <p className="stat-value">0</p>
                </div>
                <div className="stat-card">
                    <h3>Available Restaurants</h3>
                    <p className="stat-value">0</p>
                </div>
            </div>

            <div className="quick-actions">
                <h2>Quick Actions</h2>
                <div className="action-buttons">
                    <button className="action-button">
                        Make Reservation
                    </button>
                    <button className="action-button">
                        View My Reservations
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CustomerDashboard;