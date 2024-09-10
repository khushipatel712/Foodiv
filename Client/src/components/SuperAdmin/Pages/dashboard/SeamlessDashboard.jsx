import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SeamlessDashboard = () => {
    const [seamlessData, setSeamlessData] = useState({
        title: '',
        description: '',
        image: '',
        alt_tag: ''
    });
    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5001/api/seamless')
            .then((res) => {
                if (res.data) {
                    setSeamlessData(res.data);
                    setImagePreview(`http://localhost:5001/${res.data.image}`);
                }
            })
            .catch((err) => console.error('Error fetching data:', err));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSeamlessData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImagePreview(imageUrl);
            setSeamlessData(prevState => ({
                ...prevState,
                image: file
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', seamlessData.title);
        formData.append('description', seamlessData.description);
        formData.append('alt_tag', seamlessData.alt_tag);
        if (seamlessData.image) {
            formData.append('image', seamlessData.image);
        }

        // Determine whether to add or update based on the presence of image data
        if (seamlessData.image) {
            axios.put('http://localhost:5001/api/seamless', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(() => {
                alert('Data updated successfully!');
            })
            .catch((err) => console.error('Error updating data:', err));
        } else {
            axios.post('http://localhost:5001/api/seamless', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(() => {
                alert('Data added successfully!');
            })
            .catch((err) => console.error('Error adding data:', err));
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-6">Seamless Dashboard</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={seamlessData.title || ''}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-2 border rounded-md"
                        placeholder="Enter title"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Description</label>
                    <textarea
                        name="description"
                        value={seamlessData.description || ''}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-2 border rounded-md"
                        rows="4"
                        placeholder="Enter description"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Alt Tag</label>
                    <input
                        type="text"
                        name="alt_tag"
                        value={seamlessData.alt_tag || ''}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-2 border rounded-md"
                        placeholder="Enter alt tag"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="mt-1 block w-full p-2 border rounded-md"
                    />
                    {imagePreview && (
                        <div className="mt-4">
                            <img src={imagePreview} alt="Image Preview" className="w-full max-w-md" />
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
                >
                    {seamlessData.image ? 'Update Data' : 'Add Data'}
                </button>
            </form>
        </div>
    );
};

export default SeamlessDashboard;
