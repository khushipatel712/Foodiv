import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RestaurantDashboard = () => {
    const [restaurantData, setRestaurantData] = useState({
        total_restaurants: 0,
        restaurants: []
    });
    const [newRestaurants, setNewRestaurants] = useState([]);
    const [logoPreviews, setLogoPreviews] = useState([]);

    useEffect(() => {
        fetchRestaurants();
    }, []);

    const fetchRestaurants = () => {
        axios.get('http://localhost:5001/api/restaurant')
            .then((res) => {
                if (res.data) {
                    setRestaurantData(res.data);
                }
            })
            .catch((err) => console.error('Error fetching data:', err));
    };

    const handleInputChange = (index, e) => {
        const { name, value } = e.target;
        const updatedRestaurants = [...newRestaurants];
        updatedRestaurants[index] = { ...updatedRestaurants[index], [name]: value };
        setNewRestaurants(updatedRestaurants);
    };

    const handleLogoChange = (index, e) => {
        const file = e.target.files[0];
        if (file) {
            const logoUrl = URL.createObjectURL(file);
            const updatedPreviews = [...logoPreviews];
            updatedPreviews[index] = logoUrl;
            setLogoPreviews(updatedPreviews);
    
            const updatedRestaurants = [...newRestaurants];
            updatedRestaurants[index] = { ...updatedRestaurants[index], logo: file };
            setNewRestaurants(updatedRestaurants);
        }
    };

    const addNewRestaurantFields = () => {
        setNewRestaurants(prev => [...prev, { title: '', alt_tag: '', logo: null }]);
        setLogoPreviews(prev => [...prev, '']);
    };

    const removeNewRestaurant = (index) => {
        const updatedRestaurants = newRestaurants.filter((_, i) => i !== index);
        const updatedPreviews = logoPreviews.filter((_, i) => i !== index);
        setNewRestaurants(updatedRestaurants);
        setLogoPreviews(updatedPreviews);
    };

    const handleRemoveExisting = (id) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this restaurant?');
    
        if (isConfirmed) {
            axios.delete(`http://localhost:5001/api/restaurant/${id}`)
                .then(() => {
                    fetchRestaurants(); // Refresh the data after deletion
                })
                .catch((err) => console.error('Error deleting restaurant:', err));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('total_restaurants', restaurantData.total_restaurants);

        newRestaurants.forEach((restaurant, index) => {
            formData.append(`restaurants[${index}][title]`, restaurant.title);
            formData.append(`restaurants[${index}][alt_tag]`, restaurant.alt_tag);
            if (restaurant.logo) {
                formData.append(`restaurants[${index}][logo]`, restaurant.logo);
            }
        });

        axios.put('http://localhost:5001/api/restaurant', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(() => {
            alert('Data updated successfully!');
            fetchRestaurants(); // Refresh the data
            setNewRestaurants([]); // Clear the new restaurants form
            setLogoPreviews([]); // Clear logo previews
        })
        .catch((err) => console.error('Error updating data:', err));
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-6">Restaurant Dashboard</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="mb-6">
                    <label className="block text-sm font-medium">Total Restaurants</label>
                    <input
                        type="number"
                        value={restaurantData.total_restaurants}
                        onChange={(e) => setRestaurantData({...restaurantData, total_restaurants: e.target.value})}
                        className="mt-1 block w-full p-2 border rounded-md"
                        min="0"
                        required
                    />
                </div>

                <h3 className="text-xl font-semibold mb-4">Existing Restaurants</h3>
                {restaurantData.restaurants.map((restaurant, index) => (
                    <div key={restaurant._id} className="border p-4 mb-4 rounded-md">
                        <h4 className="text-lg font-semibold">Restaurant {index + 1}</h4>
                        <p><strong>Title:</strong> {restaurant.title}</p>
                        <p><strong>Alt Tag:</strong> {restaurant.alt_tag}</p>
                        <img
                            src={`http://localhost:5001/public/images/${restaurant.logo}`}
                            alt={`Logo ${index + 1}`}
                            className="mt-2 w-32 h-32 object-cover"
                        />
                        <button
                            type="button"
                            onClick={() => handleRemoveExisting(restaurant._id)}
                            className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 mt-4"
                        >
                            Remove
                        </button>
                    </div>
                ))}

                <h3 className="text-xl font-semibold mt-8 mb-4">Add New Restaurants</h3>
                {newRestaurants.map((restaurant, index) => (
                    <div key={index} className="border p-4 mb-4 rounded-md">
                        <h4 className="text-lg font-semibold">New Restaurant {index + 1}</h4>
                        <div className="mb-2">
                            <label className="block text-sm font-medium">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={restaurant.title || ''}
                                onChange={(e) => handleInputChange(index, e)}
                                className="mt-1 block w-full p-2 border rounded-md"
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-sm font-medium">Alt Tag</label>
                            <input
                                type="text"
                                name="alt_tag"
                                value={restaurant.alt_tag || ''}
                                onChange={(e) => handleInputChange(index, e)}
                                className="mt-1 block w-full p-2 border rounded-md"
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-sm font-medium">Logo</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleLogoChange(index, e)}
                                className="mt-1 block w-full p-2 border rounded-md"
                                required
                            />
                            {logoPreviews[index] && (
                                <img
                                    src={logoPreviews[index]}
                                    alt={`Logo Preview ${index + 1}`}
                                    className="mt-2 w-32 h-32 object-cover"
                                />
                            )}
                        </div>
                        <button
                            type="button"
                            onClick={() => removeNewRestaurant(index)}
                            className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 mt-2"
                        >
                            Remove
                        </button>
                    </div>
                ))}

                <button
                    type="button"
                    onClick={addNewRestaurantFields}
                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
                >
                    Add New Restaurant
                </button>

                <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 mt-6"
                >
                    Save All Changes
                </button>
            </form>
        </div>
    );
};

export default RestaurantDashboard;