import React from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext.jsx';
import './Navbar.css';

const Navbar = () => {
    const { user, logout } = useUser();

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-brand">
                    DAW App
                </Link>
                
                <div className="navbar-content">
                    {user ? (
                        <>
                            <div className="user-info">
                                <span className="user-name">{user.name}</span>
                                <span className="user-email">({user.email})</span>
                                <span className="user-role">{user.role}</span>
                            </div>
                            <button onClick={logout} className="logout-button">
                                Logout
                            </button>
                        </>
                    ) : (
                        <div className="auth-links">
                            <Link to="/login" className="login-link">
                                Login
                            </Link>
                            <Link to="/register" className="register-link">
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;