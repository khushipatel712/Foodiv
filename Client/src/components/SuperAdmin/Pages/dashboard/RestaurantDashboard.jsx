import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RestaurantDashboard = () => {
    const [restaurantData, setRestaurantData] = useState({
        total_restaurants: '',
        restaurants: []
    });
    const [newRestaurant, setNewRestaurant] = useState({
        title: '',
        alt_tag: '',
        logo: ''
    });
    const [logoPreview, setLogoPreview] = useState('');

    useEffect(() => {
        // Fetch the restaurant data
        axios.get('http://localhost:5001/api/restaurant')
            .then((res) => {
                if (res.data) {
                    setRestaurantData(res.data);
                }
            })
            .catch((err) => console.error('Error fetching data:', err));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewRestaurant(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const logoUrl = URL.createObjectURL(file);
            setLogoPreview(logoUrl);
            setNewRestaurant(prevState => ({
                ...prevState,
                logo: file
            }));
        }
    };

    const addRestaurant = () => {
        const formData = new FormData();
        formData.append('total_restaurants', restaurantData.total_restaurants);
        formData.append('restaurants', JSON.stringify([...restaurantData.restaurants, newRestaurant]));
        if (newRestaurant.logo) {
            formData.append('logo', newRestaurant.logo);
        }

        axios.put('http://localhost:5001/api/restaurant', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(() => {
            alert('Restaurant added successfully!');
            setRestaurantData(prevData => ({
                ...prevData,
                restaurants: [...prevData.restaurants, newRestaurant]
            }));
            setNewRestaurant({
                title: '',
                alt_tag: '',
                logo: ''
            });
            setLogoPreview('');
        })
        .catch((err) => console.error('Error adding restaurant:', err));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put('http://localhost:5001/api/restaurant', restaurantData, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(() => {
            alert('Data updated successfully!');
        })
        .catch((err) => console.error('Error updating data:', err));
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-6">Restaurant Dashboard</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium">Total Restaurants</label>
                    <input
                        type="number"
                        name="total_restaurants"
                        value={restaurantData.total_restaurants || ''}
                        onChange={(e) => setRestaurantData({ ...restaurantData, total_restaurants: e.target.value })}
                        className="mt-1 block w-full p-2 border rounded-md"
                        placeholder="Enter total number of restaurants"
                    />
                </div>

                {restaurantData.restaurants.map((restaurant, index) => (
                    <div key={index} className="border p-4 mb-4 rounded-md">
                        <h3 className="text-lg font-semibold">Restaurant {index + 1}</h3>
                        <div>
                            <label className="block text-sm font-medium">Title</label>
                            <input
                                type="text"
                                value={restaurant.title}
                                readOnly
                                className="mt-1 block w-full p-2 border rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Alt Tag</label>
                            <input
                                type="text"
                                value={restaurant.alt_tag}
                                readOnly
                                className="mt-1 block w-full p-2 border rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium">Logo</label>
                            <img
                                src={restaurant.logo}
                                alt={`Logo ${index + 1}`}
                                className="mt-4 w-full max-w-md"
                            />
                        </div>
                    </div>
                ))}

                <h2 className="text-2xl font-bold mb-6">Add New Restaurant</h2>
                <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={newRestaurant.title || ''}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-2 border rounded-md"
                        placeholder="Enter title"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Alt Tag</label>
                    <input
                        type="text"
                        name="alt_tag"
                        value={newRestaurant.alt_tag || ''}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-2 border rounded-md"
                        placeholder="Enter alt tag"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Logo</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoChange}
                        className="mt-1 block w-full p-2 border rounded-md"
                    />
                    {logoPreview && (
                        <div className="mt-4">
                            <img
                                src={logoPreview}
                                alt="Logo Preview"
                                className="w-full max-w-md"
                            />
                        </div>
                    )}
                </div>

                <button
                    type="button"
                    onClick={addRestaurant}
                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
                >
                    Add Restaurant
                </button>

                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
                >
                    Update Data
                </button>
            </form>
        </div>
    );
};

export default RestaurantDashboard;
