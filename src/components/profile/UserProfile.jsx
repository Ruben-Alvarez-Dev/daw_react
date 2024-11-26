import React, { useState, useEffect } from 'react';
import { useUser } from '../../contexts/UserContext.jsx';
import './Profile.css';

const UserProfile = () => {
    const { user, login } = useUser();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        current_password: '',
        new_password: '',
        new_password_confirmation: ''
    });
    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (user) {
            setFormData(prevState => ({
                ...prevState,
                name: user.name,
                email: user.email
            }));
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
        setError('');
        setSuccess('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccess('');

        try {
            const token = localStorage.getItem('token');
            const dataToSend = {
                name: formData.name,
                email: formData.email
            };

            // Solo incluir passwords si se están actualizando
            if (formData.current_password) {
                dataToSend.current_password = formData.current_password;
                dataToSend.new_password = formData.new_password;
                dataToSend.new_password_confirmation = formData.new_password_confirmation;
            }

            const response = await fetch('http://localhost:8000/api/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(dataToSend)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error updating profile');
            }

            // Actualizar el contexto del usuario
            login(data.user);
            setSuccess('Profile updated successfully');
            setIsEditing(false);
            
            // Limpiar campos de contraseña
            setFormData(prev => ({
                ...prev,
                current_password: '',
                new_password: '',
                new_password_confirmation: ''
            }));

        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="profile-container">
            <h2>Profile Settings</h2>
            
            <div className="profile-card">
                <form onSubmit={handleSubmit}>
                    {error && <div className="error-message">{error}</div>}
                    {success && <div className="success-message">{success}</div>}
                    
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            disabled={!isEditing || isLoading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            disabled={!isEditing || isLoading}
                        />
                    </div>

                    {isEditing && (
                        <>
                            <div className="password-section">
                                <h3>Change Password</h3>
                                <div className="form-group">
                                    <label htmlFor="current_password">Current Password</label>
                                    <input
                                        type="password"
                                        id="current_password"
                                        name="current_password"
                                        value={formData.current_password}
                                        onChange={handleChange}
                                        disabled={isLoading}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="new_password">New Password</label>
                                    <input
                                        type="password"
                                        id="new_password"
                                        name="new_password"
                                        value={formData.new_password}
                                        onChange={handleChange}
                                        disabled={isLoading}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="new_password_confirmation">Confirm New Password</label>
                                    <input
                                        type="password"
                                        id="new_password_confirmation"
                                        name="new_password_confirmation"
                                        value={formData.new_password_confirmation}
                                        onChange={handleChange}
                                        disabled={isLoading}
                                    />
                                </div>
                            </div>

                            <div className="button-group">
                                <button 
                                    type="submit" 
                                    className="save-button"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Saving...' : 'Save Changes'}
                                </button>
                                <button 
                                    type="button" 
                                    className="cancel-button"
                                    onClick={() => {
                                        setIsEditing(false);
                                        setFormData(prev => ({
                                            ...prev,
                                            name: user.name,
                                            email: user.email,
                                            current_password: '',
                                            new_password: '',
                                            new_password_confirmation: ''
                                        }));
                                    }}
                                    disabled={isLoading}
                                >
                                    Cancel
                                </button>
                            </div>
                        </>
                    )}

                    {!isEditing && (
                        <button 
                            type="button" 
                            className="edit-button"
                            onClick={() => setIsEditing(true)}
                            disabled={isLoading}
                        >
                            Edit Profile
                        </button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default UserProfile;