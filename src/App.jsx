import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext.jsx';
import { useUser } from './contexts/UserContext.jsx';
import Navbar from './components/layout/Navbar.jsx';
import Login from './components/auth/Login.jsx';
import Register from './components/auth/Register.jsx';
import AdminDashboard from './components/admin/AdminDashboard.jsx';
import CustomerDashboard from './components/customer/CustomerDashboard.jsx';
import UserProfile from './components/profile/UserProfile.jsx';
import RestaurantList from './components/restaurants/RestaurantList.jsx';
import './App.css';

const PrivateRoute = ({ children }) => {
    const { user } = useUser();
    return user ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
    const { user } = useUser();
    return !user ? children : <Navigate to="/" />;
};

const AppContent = () => {
    const { user } = useUser();

    return (
        <div className="app">
            <Navbar />
            <div className="app-container">
                <Routes>
                    <Route path="/" element={
                        user ? (
                            user.role === 'admin' ? 
                            <Navigate to="/admin" /> : 
                            <Navigate to="/customer" />
                        ) : (
                            <Navigate to="/login" />
                        )
                    } />

                    <Route path="/login" element={
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    } />
                    
                    <Route path="/register" element={
                        <PublicRoute>
                            <Register />
                        </PublicRoute>
                    } />

                    <Route path="/admin" element={
                        <PrivateRoute>
                            <AdminDashboard />
                        </PrivateRoute>
                    } />

                    <Route path="/customer" element={
                        <PrivateRoute>
                            <CustomerDashboard />
                        </PrivateRoute>
                    } />

                    <Route path="/profile" element={
                        <PrivateRoute>
                            <UserProfile />
                        </PrivateRoute>
                    } />

                    <Route path="/restaurants" element={
                        <PrivateRoute>
                            <RestaurantList />
                        </PrivateRoute>
                    } />

                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </div>
        </div>
    );
};

const App = () => {
    return (
        <Router>
            <UserProvider>
                <AppContent />
            </UserProvider>
        </Router>
    );
};

export default App;