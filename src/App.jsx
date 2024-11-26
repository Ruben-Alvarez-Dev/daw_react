import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext.jsx';
import { useUser } from './contexts/UserContext.jsx';
import Navbar from './components/layout/Navbar.jsx';
import Login from './components/auth/Login.jsx';
import Register from './components/auth/Register.jsx';
import AdminDashboard from './components/admin/AdminDashboard.jsx';
import CustomerDashboard from './components/customer/CustomerDashboard.jsx';
import UserProfile from './components/profile/UserProfile.jsx';
import './App.css';

// Componente para proteger rutas
const PrivateRoute = ({ children }) => {
    const { user } = useUser();
    
    if (!user) {
        return <Navigate to="/login" />;
    }
    
    return children;
};

// Componente para rutas de autenticación
const PublicRoute = ({ children }) => {
    const { user } = useUser();
    
    if (user) {
        return <Navigate to="/" />;
    }
    
    return children;
};

// Componente para manejar la redirección inicial
const HomeRedirect = () => {
    const { user } = useUser();
    
    if (!user) {
        return <Navigate to="/login" />;
    }
    
    return user.role === 'admin' ? 
        <Navigate to="/admin" /> : 
        <Navigate to="/customer" />;
};

const App = () => {
    return (
        <Router>
            <UserProvider>
                <div className="app">
                    <Navbar />
                    <div className="app-container">
                        <Routes>
                            {/* Ruta principal */}
                            <Route path="/" element={<HomeRedirect />} />

                            {/* Rutas públicas */}
                            <Route 
                                path="/login" 
                                element={
                                    <PublicRoute>
                                        <Login />
                                    </PublicRoute>
                                } 
                            />
                            <Route 
                                path="/register" 
                                element={
                                    <PublicRoute>
                                        <Register />
                                    </PublicRoute>
                                } 
                            />

                            {/* Rutas protegidas */}
                            <Route 
                                path="/profile" 
                                element={
                                    <PrivateRoute>
                                        <UserProfile />
                                    </PrivateRoute>
                                } 
                            />
                            <Route 
                                path="/admin" 
                                element={
                                    <PrivateRoute>
                                        <AdminDashboard />
                                    </PrivateRoute>
                                } 
                            />
                            <Route 
                                path="/customer" 
                                element={
                                    <PrivateRoute>
                                        <CustomerDashboard />
                                    </PrivateRoute>
                                } 
                            />

                            {/* Ruta para manejar rutas no encontradas */}
                            <Route path="*" element={<Navigate to="/" replace />} />
                        </Routes>
                    </div>
                </div>
            </UserProvider>
        </Router>
    );
};

export default App;