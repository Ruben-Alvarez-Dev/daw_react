import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';

const PrivateRoute = ({ children }) => {
    console.log('PrivateRoute rendering'); // Debug log
    const { user } = useUser();
    
    console.log('User in PrivateRoute:', user); // Debug log

    if (!user) {
        console.log('No user, redirecting to login'); // Debug log
        return <Navigate to="/login" />;
    }
    
    console.log('User authenticated, rendering children'); // Debug log
    return children;
};

export default PrivateRoute;