import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PartnerNetworkDashboard = () => {
    const [partnerNetworkData, setPartnerNetworkData] = useState({
        title: '',
        image: '',
        keypoints: []
    });
    const [newKeypoints, setNewKeypoints] = useState([]);
    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        fetchPartnerNetwork();
    }, []);

    const fetchPartnerNetwork = () => {
        axios.get('http://localhost:5001/api/partnernetwork')
            .then((res) => {
                if (res.data) {
                    setPartnerNetworkData(res.data);
                    setImagePreview(`http://localhost:5001/public/images/${res.data.image}`);
                }
            })
            .catch((err) => console.error('Error fetching data:', err));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setPartnerNetworkData({ ...partnerNetworkData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImagePreview(imageUrl);
            setPartnerNetworkData({ ...partnerNetworkData, image: file });
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
            await axios.delete('http://localhost:5001/api/partnernetwork/keypoints', {
                params: { keypoint }
            });
            alert('Keypoint removed successfully');
            fetchPartnerNetwork();
        } catch (error) {
            console.error('Error removing keypoint:', error);
            alert('Failed to remove keypoint');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append('title', partnerNetworkData.title);
    
        if (partnerNetworkData.image instanceof File) formData.append('image', partnerNetworkData.image);
    
        // Combine existing keypoints with new keypoints
        const allKeypoints = [...partnerNetworkData.keypoints, ...newKeypoints.filter(kp => kp.trim() !== '')];
        
        // Convert keypoints to a JSON string
        formData.append('keypoints', JSON.stringify(allKeypoints));
    
        // Log FormData content for debugging
        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }
    
        axios.put('http://localhost:5001/api/partnernetwork', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(() => {
            alert('Data updated successfully!');
            fetchPartnerNetwork(); // Refresh the data
            setNewKeypoints([]); // Clear the new keypoints
        })
        .catch((err) => console.error('Error updating data:', err));
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-6">PartnerNetwork Dashboard</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="mb-6">
                    <label className="block text-sm font-medium">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={partnerNetworkData.title}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-2 border rounded-md"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium">Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="mt-1 block w-full p-2 border rounded-md"
                    />
                    {imagePreview && (
                        <img
                            src={imagePreview}
                            alt="Image Preview"
                            className="mt-2 w-32 h-32 object-cover"
                        />
                    )}
                </div>

                <h3 className="text-xl font-semibold mb-4">Existing Keypoints</h3>
                {partnerNetworkData.keypoints?.map((keypoint, index) => (
                    <div key={index} className="border p-4 mb-4 rounded-md">
                        <p><strong>Keypoint {index + 1}:</strong> {keypoint}</p>
                        <button
                            type="button"
                            onClick={() => handleRemoveExistingKeypoint(keypoint)}
                            className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 mt-4"
                        >
                            Remove
                        </button>
                    </div>
                ))}

                <h3 className="text-xl font-semibold mt-8 mb-4">Add New Keypoints</h3>
                {newKeypoints?.map((keypoint, index) => (
                    <div key={index} className="border p-4 mb-4 rounded-md">
                        <h4 className="text-lg font-semibold">New Keypoint {index + 1}</h4>
                        <div className="mb-2">
                            <input
                                type="text"
                                value={keypoint || ''}
                                onChange={(e) => handleKeypointChange(index, e)}
                                className="mt-1 block w-full p-2 border rounded-md"
                                required
                            />
                        </div>
                        <button
                            type="button"
                            onClick={() => handleRemoveKeypoint(index)}
                            className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 mt-2"
                        >
                            Remove
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={handleAddKeypoint}
                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
                >
                    Add New Keypoint
                </button>
                <div className="mt-6">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default PartnerNetworkDashboard;
