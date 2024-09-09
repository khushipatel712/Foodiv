import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OnlineWebDashboard = () => {
    const [onlineWebData, setOnlineWebData] = useState({
        title: '',
        description: '',
        points: ['']
    });

    useEffect(() => {
        // Fetch the onlineWeb data
        axios.get('http://localhost:5001/api/onlineweb')
            .then((res) => {
                setOnlineWebData(res.data);
            })
            .catch((err) => console.error('Error fetching data:', err));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOnlineWebData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handlePointChange = (index, e) => {
        const { value } = e.target;
        const updatedPoints = [...onlineWebData.points];
        updatedPoints[index] = value;
        setOnlineWebData(prevState => ({
            ...prevState,
            points: updatedPoints
        }));
    };

    const addPoint = () => {
        setOnlineWebData(prevState => ({
            ...prevState,
            points: [...prevState.points, '']
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put('http://localhost:5001/api/onlineweb', onlineWebData)
            .then(() => {
                alert('Data updated successfully!');
            })
            .catch((err) => console.error('Error updating data:', err));
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-6">OnlineWeb Dashboard</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={onlineWebData.title || ''}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-2 border rounded-md"
                        placeholder="Enter title"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Description</label>
                    <textarea
                        name="description"
                        value={onlineWebData.description || ''}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-2 border rounded-md"
                        rows="4"
                        placeholder="Enter description"
                    />
                </div>

                <div>
                    <h3 className="text-lg font-semibold">Points</h3>
                    {onlineWebData.points.map((point, index) => (
                        <div key={index} className="border p-4 mb-4 rounded-md">
                            <label className="block text-sm font-medium">Point {index + 1}</label>
                            <input
                                type="text"
                                value={point}
                                onChange={(e) => handlePointChange(index, e)}
                                className="mt-1 block w-full p-2 border rounded-md"
                                placeholder={`Enter point ${index + 1}`}
                            />
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addPoint}
                        className="text-blue-500 hover:underline"
                    >
                        Add Point
                    </button>
                </div>

                <div>
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
                    >
                        Update Data
                    </button>
                </div>
            </form>
        </div>
    );
};

export default OnlineWebDashboard;
