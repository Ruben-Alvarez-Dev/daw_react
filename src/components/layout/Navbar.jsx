import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext.jsx';
import './Navbar.css';

const Navbar = () => {
    const { user, logout } = useUser();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-brand">
                    DAW App
                </Link>

                {user && (
                    <div className="navbar-center">
                        <div className="nav-links">
                            {user.role === 'admin' ? (
                                <>
                                    <Link to="/admin" className="nav-link">Dashboard</Link>
                                    <Link to="/restaurants" className="nav-link">Restaurants</Link>
                                    <Link to="/reservations" className="nav-link">Reservations</Link>
                                </>
                            ) : (
                                <>
                                    <Link to="/customer" className="nav-link">Dashboard</Link>
                                    <Link to="/restaurants" className="nav-link">Restaurants</Link>
                                    <Link to="/reservations" className="nav-link">My Reservations</Link>
                                </>
                            )}
                        </div>
                    </div>
                )}

                <div className="navbar-right">
                    {user ? (
                        <div className="user-menu">
                            <div className="user-info">
                                <span className="user-name">{user.name}</span>
                                <span className="user-role">({user.role})</span>
                            </div>
                            <div className="nav-links">
                                <Link to="/profile" className="nav-link">Profile</Link>
                                <button onClick={handleLogout} className="logout-button">
                                    Logout
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="auth-links">
                            <Link to="/login" className="nav-link">Login</Link>
                            <Link to="/register" className="register-link">Register</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;