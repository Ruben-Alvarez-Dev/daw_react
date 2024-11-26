import React from 'react';
import { useUser } from '../../contexts/UserContext.jsx';

const CustomerDashboard = () => {
    const { user } = useUser();

    return (
        <div className="dashboard-container">
            <h1>Customer Dashboard</h1>
            <div className="user-info">
                <p>Welcome, {user.name}!</p>
                <p>Email: {user.email}</p>
                <p>Role: {user.role}</p>
            </div>
        </div>
    );
};

export default CustomerDashboard;