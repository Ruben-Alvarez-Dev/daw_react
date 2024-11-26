import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import RestaurantForm from './RestaurantForm';
import './Restaurants.css';

const RestaurantList = () => {
    console.log('RestaurantList component rendering'); // Debug log

    const { user } = useUser();
    const [restaurants, setRestaurants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);

    const isAdmin = user?.role === 'admin';
    console.log('User role:', user?.role); // Debug log

    useEffect(() => {
        console.log('useEffect running'); // Debug log
        fetchRestaurants();
    }, []);

    const fetchRestaurants = async () => {
        console.log('Fetching restaurants...'); // Debug log
        try {
            const token = localStorage.getItem('token');
            console.log('Token:', token); // Debug log

            const response = await fetch('http://localhost:8000/api/restaurants', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });

            console.log('Response status:', response.status); // Debug log

            if (!response.ok) {
                throw new Error('Failed to fetch restaurants');
            }

            const data = await response.json();
            console.log('Restaurants data:', data); // Debug log
            setRestaurants(data);
        } catch (err) {
            console.error('Error fetching restaurants:', err); // Debug log
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleShowAddForm = () => {
        console.log('Showing add form'); // Debug log
        setShowAddForm(true);
    };

    if (loading) {
        console.log('Showing loading state'); // Debug log
        return <div className="loading">Loading restaurants...</div>;
    }
    
    if (error) {
        console.log('Showing error state:', error); // Debug log
        return <div className="error-message">{error}</div>;
    }

    console.log('Rendering restaurant list. Number of restaurants:', restaurants.length); // Debug log

    return (
        <div className="restaurant-list-container">
            <div className="list-header">
                <h2>Restaurants</h2>
                {isAdmin && (
                    <button 
                        className="add-button"
                        onClick={handleShowAddForm}
                    >
                        Add Restaurant
                    </button>
                )}
            </div>

            {restaurants.length === 0 ? (
                <div className="no-restaurants">
                    No restaurants available.
                </div>
            ) : (
                <div className="restaurant-grid">
                    {restaurants.map(restaurant => (
                        <div key={restaurant.id} className="restaurant-card">
                            <div className="restaurant-info">
                                <h3>{restaurant.name}</h3>
                                <p className="description">{restaurant.description}</p>
                                <p className="address">{restaurant.address}</p>
                                <p className="phone">{restaurant.phone}</p>
                                <p className="capacity">Capacity: {restaurant.capacity} people</p>
                            </div>
                            <div className="restaurant-actions">
                                <Link 
                                    to={`/restaurants/${restaurant.id}/tables`}
                                    className="view-tables-button"
                                >
                                    View Tables
                                </Link>
                                {isAdmin && (
                                    <>
                                        <button 
                                            className="edit-button"
                                            onClick={() => handleEdit(restaurant)}
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            className="delete-button"
                                            onClick={() => handleDelete(restaurant.id)}
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
                                {!isAdmin && (
                                    <Link 
                                        to={`/restaurants/${restaurant.id}/reserve`}
                                        className="reserve-button"
                                    >
                                        Make Reservation
                                    </Link>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {showAddForm && (
                <RestaurantForm 
                    onClose={() => setShowAddForm(false)}
                    onSave={() => {
                        fetchRestaurants();
                        setShowAddForm(false);
                    }}
                />
            )}
        </div>
    );
};

export default RestaurantList;