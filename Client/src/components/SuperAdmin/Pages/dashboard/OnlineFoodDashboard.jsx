import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OnlineFoodDashboard = () => {
    const [onlineFoodData, setOnlineFoodData] = useState({
        title: '',
        logo: '',
        image: '',
        description: '',
        keypoints: []
    });
    const [newKeypoints, setNewKeypoints] = useState([]);
    const [logoPreview, setLogoPreview] = useState('');
    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        fetchOnlineFood();
    }, []);

    const fetchOnlineFood = () => {
        axios.get('http://localhost:5001/api/onlinefood')
            .then((res) => {
                if (res.data) {
                    setOnlineFoodData(res.data);
                    setLogoPreview(`http://localhost:5001/public/images/${res.data.logo}`);
                    setImagePreview(`http://localhost:5001/public/images/${res.data.image}`);
                }
            })
            .catch((err) => console.error('Error fetching data:', err));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setOnlineFoodData({ ...onlineFoodData, [name]: value });
    };

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const logoUrl = URL.createObjectURL(file);
            setLogoPreview(logoUrl);
            setOnlineFoodData({ ...onlineFoodData, logo: file });
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImagePreview(imageUrl);
            setOnlineFoodData({ ...onlineFoodData, image: file });
        }
    };

    const handleAddKeypoint = () => {
        setNewKeypoints([...newKeypoints, '']);
    };

    const handleKeypointChange = (index, e) => {
        const { value } = e.target;
        const updatedKeypoints = [...newKeypoints];
        updatedKeypoints[index] = value;
        setNewKeypoints(updatedKeypoints);
    };

    const handleRemoveKeypoint = (index) => {
        const updatedKeypoints = newKeypoints.filter((_, i) => i !== index);
        setNewKeypoints(updatedKeypoints);
    };

    const handleRemoveExistingKeypoint = async (keypoint) => {
        try {
            await axios.delete('http://localhost:5001/api/onlinefood/keypoints', {
                params: { keypoint }
            });
            alert('Keypoint removed successfully');
            fetchOnlineFood();
        } catch (error) {
            console.error('Error removing keypoint:', error);
            alert('Failed to remove keypoint');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', onlineFoodData.title);
        formData.append('description', onlineFoodData.description);

        if (onlineFoodData.logo instanceof File) formData.append('logo', onlineFoodData.logo);
        if (onlineFoodData.image instanceof File) formData.append('image', onlineFoodData.image);

        const allKeypoints = [...onlineFoodData.keypoints, ...newKeypoints.filter(kp => kp.trim() !== '')];
        formData.append('keypoints', JSON.stringify(allKeypoints));

        axios.put('http://localhost:5001/api/onlinefood', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(() => {
            alert('Data updated successfully!');
            fetchOnlineFood();
            setNewKeypoints([]);
        })
        .catch((err) => console.error('Error updating data:', err));
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-6">OnlineFood Dashboard</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="mb-6">
                    <label className="block text-sm font-medium">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={onlineFoodData.title}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-2 border rounded-md"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium">Description</label>
                    <textarea
                        name="description"
                        value={onlineFoodData.description}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-2 border rounded-md"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium">Logo</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoChange}
                        className="mt-1 block w-full"
                    />
                    {logoPreview && (
                        <img src={logoPreview} alt="Logo Preview" className="mt-2 w-32 h-32 object-cover" />
                    )}
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium">Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="mt-1 block w-full"
                    />
                    {imagePreview && (
                        <img src={imagePreview} alt="Image Preview" className="mt-2 w-32 h-32 object-cover" />
                    )}
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium">Keypoints</label>
                    {onlineFoodData.keypoints.map((kp, index) => (
                        <div key={index} className="flex items-center space-x-2 mb-2">
                            <input
                                type="text"
                                value={kp}
                                onChange={(e) => handleKeypointChange(index, e)}
                                className="block w-full p-2 border rounded-md"
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveExistingKeypoint(kp)}
                                className="ml-2 bg-red-500 text-white p-2 rounded-md"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    {newKeypoints.map((kp, index) => (
                        <div key={index} className="flex items-center space-x-2 mb-2">
                            <input
                                type="text"
                                value={kp}
                                onChange={(e) => handleKeypointChange(index, e)}
                                className="block w-full p-2 border rounded-md"
                            />
                            <button
                                type="button"
                                onClick={() => handleRemoveKeypoint(index)}
                                className="ml-2 bg-red-500 text-white p-2 rounded-md"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={handleAddKeypoint}
                        className="bg-blue-500 text-white p-2 rounded-md"
                    >
                        Add Keypoint
                    </button>
                </div>
                <button
                    type="submit"
                    className="bg-green-500 text-white p-4 rounded-md"
                >
                    Update
                </button>
            </form>
        </div>
    );
};

export default OnlineFoodDashboard;
