import React from 'react';
import { useUser } from '../../contexts/UserContext.jsx';

const AdminDashboard = () => {
    const { user } = useUser();

    return (
        <div className="dashboard-container">
            <h1>Admin Dashboard</h1>
            <div className="user-info">
                <p>Welcome, {user.name}!</p>
                <p>Email: {user.email}</p>
                <p>Role: {user.role}</p>
            </div>
            {/* Aquí irán los controles de administración */}
        </div>
    );
};

export default AdminDashboard;