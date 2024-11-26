import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext.jsx';
import { useUser } from './contexts/UserContext.jsx';
import Navbar from './components/layout/Navbar.jsx';
import Login from './components/auth/Login.jsx';
import Register from './components/auth/Register.jsx';
import AdminDashboard from './components/admin/AdminDashboard.jsx';
import CustomerDashboard from './components/customer/CustomerDashboard.jsx';
import ProtectedRoute from './components/auth/ProtectedRoute.jsx';
import './App.css';

// Componente que redirige según el rol del usuario
const DashboardRouter = () => {
    const { user } = useUser();
    
    if (user?.role === 'admin') {
        return <Navigate to="/admin" replace />;
    }
    return <Navigate to="/customer" replace />;
};

// Componente que previene acceder a login/register si ya está autenticado
const AuthRoute = ({ children }) => {
    const { user } = useUser();
    const location = useLocation();

    if (user) {
        // Redirige al dashboard correspondiente si ya está autenticado
        return <Navigate to="/" replace />;
    }

    return children;
};

const App = () => {
    return (
        <Router>
            <UserProvider>
                <div className="app">
                    <Navbar />
                    <div className="app-container">
                        <Routes>
                            {/* Ruta por defecto */}
                            <Route path="/" element={
                                <ProtectedRoute>
                                    <DashboardRouter />
                                </ProtectedRoute>
                            } />

                            {/* Rutas de autenticación */}
                            <Route path="/login" element={<AuthRoute><Login /></AuthRoute>} />
                            <Route path="/register" element={<AuthRoute><Register /></AuthRoute>} />

                            {/* Rutas protegidas */}
                            <Route path="/admin" element={
                                <ProtectedRoute>
                                    <AdminDashboard />
                                </ProtectedRoute>
                            } />
                            <Route path="/customer" element={
                                <ProtectedRoute>
                                    <CustomerDashboard />
                                </ProtectedRoute>
                            } />
                        </Routes>
                    </div>
                </div>
            </UserProvider>
        </Router>
    );
};

export default App;