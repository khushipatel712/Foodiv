import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SmoothProcessDashboard = () => {
    const [smoothProcessData, setSmoothProcessData] = useState({
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
        fetchSmoothProcess();
    }, []);

    const fetchSmoothProcess = () => {
        axios.get('http://localhost:5001/api/smoothprocess')
            .then((res) => {
                if (res.data) {
                    setSmoothProcessData(res.data);
                    setLogoPreview(`http://localhost:5001/public/images/${res.data.logo}`);
                    setImagePreview(`http://localhost:5001/public/images/${res.data.image}`);
                }
            })
            .catch((err) => console.error('Error fetching data:', err));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSmoothProcessData({ ...smoothProcessData, [name]: value });
    };

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const logoUrl = URL.createObjectURL(file);
            setLogoPreview(logoUrl);
            setSmoothProcessData({ ...smoothProcessData, logo: file });
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImagePreview(imageUrl);
            setSmoothProcessData({ ...smoothProcessData, image: file });
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
            await axios.delete('http://localhost:5001/api/smoothprocess/keypoints', {
                params: { keypoint }
            });
            alert('Keypoint removed successfully');
            fetchSmoothProcess();
        } catch (error) {
            console.error('Error removing keypoint:', error);
            alert('Failed to remove keypoint');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', smoothProcessData.title);
        formData.append('description', smoothProcessData.description);

        if (smoothProcessData.logo instanceof File) formData.append('logo', smoothProcessData.logo);
        if (smoothProcessData.image instanceof File) formData.append('image', smoothProcessData.image);

        // Combine existing keypoints with new keypoints
        const allKeypoints = [...smoothProcessData.keypoints, ...newKeypoints.filter(kp => kp.trim() !== '')];
        
        // Convert keypoints to a JSON string
        formData.append('keypoints', JSON.stringify(allKeypoints));

        // Log FormData content for debugging
        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        axios.put('http://localhost:5001/api/smoothprocess', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(() => {
            alert('Data updated successfully!');
            fetchSmoothProcess(); // Refresh the data
            setNewKeypoints([]); // Clear the new keypoints
        })
        .catch((err) => console.error('Error updating data:', err));
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-6">SmoothProcess Dashboard</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="mb-6">
                    <label className="block text-sm font-medium">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={smoothProcessData.title}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-2 border rounded-md"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium">Description</label>
                    <textarea
                        name="description"
                        value={smoothProcessData.description}
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
                    {logoPreview && <img src={logoPreview} alt="Logo Preview" className="mt-2 w-32 h-32 object-cover" />}
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium">Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="mt-1 block w-full"
                    />
                    {imagePreview && <img src={imagePreview} alt="Image Preview" className="mt-2 w-32 h-32 object-cover" />}
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium">Keypoints</label>
                    <div className="space-y-2">
                        {smoothProcessData.keypoints.map((keypoint, index) => (
                            <div key={index} className="flex items-center">
                                <span className="block w-full p-2 border rounded-md">{keypoint}</span>
                                <button
                                    type="button"
                                    onClick={() => handleRemoveExistingKeypoint(keypoint)}
                                    className="ml-4 px-4 py-2 text-white bg-red-500 rounded-md"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        {newKeypoints.map((keypoint, index) => (
                            <div key={index} className="flex items-center">
                                <input
                                    type="text"
                                    value={keypoint}
                                    onChange={(e) => handleKeypointChange(index, e)}
                                    className="block w-full p-2 border rounded-md"
                                    placeholder="Enter new keypoint"
                                />
                                <button
                                    type="button"
                                    onClick={() => handleRemoveKeypoint(index)}
                                    className="ml-4 px-4 py-2 text-white bg-red-500 rounded-md"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={handleAddKeypoint}
                            className="px-4 py-2 text-white bg-blue-500 rounded-md"
                        >
                            Add Keypoint
                        </button>
                    </div>
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 text-white bg-green-500 rounded-md"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default SmoothProcessDashboard;
