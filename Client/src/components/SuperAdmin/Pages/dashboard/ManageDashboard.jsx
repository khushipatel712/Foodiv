import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageDashboard = () => {
    const [manageData, setManageData] = useState({
        title: '',
        description: '',
        video: '',
        alt_tag: ''
    });
    const [videoPreview, setVideoPreview] = useState('');

    useEffect(() => {

        axios.get('http://localhost:5001/api/manage')
            .then((res) => {
                if (res.data) {
                    setManageData(res.data);
                    setVideoPreview(`http://localhost:5001/${res.data.video}`);
                }
            })
            .catch((err) => console.error('Error fetching data:', err));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setManageData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleVideoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const videoUrl = URL.createObjectURL(file);
            setVideoPreview(videoUrl);
            setManageData(prevState => ({
                ...prevState,
                video: file
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', manageData.title);
        formData.append('description', manageData.description);
        formData.append('alt_tag', manageData.alt_tag);
        if (manageData.video) {
            formData.append('video', manageData.video);
        }

        // Determine whether to add or update based on the presence of video data
        if (manageData.video) {
            axios.put('http://localhost:5001/api/manage', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
            .then(() => {
                alert('Data updated successfully!');
            })
            .catch((err) => console.error('Error updating data:', err));
        } else {
            axios.post('http://localhost:5001/api/manage', formData, {
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
            <h2 className="text-2xl font-bold mb-6">Manage Dashboard</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={manageData.title || ''}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-2 border rounded-md"
                        placeholder="Enter title"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Description</label>
                    <textarea
                        name="description"
                        value={manageData.description || ''}
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
                        value={manageData.alt_tag || ''}
                        onChange={handleInputChange}
                        className="mt-1 block w-full p-2 border rounded-md"
                        placeholder="Enter alt tag"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Video</label>
                    <input
                        type="file"
                        accept="video/*"
                        onChange={handleVideoChange}
                        className="mt-1 block w-full p-2 border rounded-md"
                    />
                    {videoPreview && (
                        <div className="mt-4">
                            <video controls className="w-full max-w-md">
                                <source src={videoPreview} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
                >
                    {manageData.video ? 'Update Data' : 'Add Data'}
                </button>
            </form>
        </div>
    );
};

export default ManageDashboard;
