import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Header = () => {
    const [header, setHeader] = useState({ title: '', logo: '' });
    const [newTitle, setNewTitle] = useState('');
    const [logoFile, setLogoFile] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchHeader = async () => {
            try {
                const response = await axios.get('http://localhost:5001/api/headers');
                setHeader(response.data);
                setNewTitle(response.data.title);
            } catch (error) {
                console.error('Error fetching the header:', error);
            }
        };

        fetchHeader();
    }, []);

    const handleTitleChange = (e) => {
        setNewTitle(e.target.value);
    };

    const handleFileChange = (e) => {
        setLogoFile(e.target.files[0]);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', newTitle);
        if (logoFile) {
            formData.append('logo', logoFile);
        }

        try {
            const response = await axios.put('http://localhost:5001/api/headers', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setHeader(response.data);
            setMessage('Header updated successfully');
        } catch (error) {
            setMessage('Error updating header');
            console.error('Error updating header:', error);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
            <p className="text-2xl font-bold mb-4">Header Setting</p>

            {header.logo && (
                <div className="mb-4">
                    <img
                        src={`http://localhost:5001/public/images/${header.logo}`}
                        alt="Logo"
                        className="h-20"
                    />
                </div>
            )}

            <form onSubmit={handleUpdate} className="space-y-4">
                <div>
                    <label className="block text-lg font-medium mb-1">Title:</label>
                    <input
                        type="text"
                        value={newTitle}
                        onChange={handleTitleChange}
                        className="p-2 border rounded w-full"
                        required
                    />
                </div>

                <div>
                    <label className="block text-lg font-medium mb-1">Logo:</label>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="p-2 border rounded w-full"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded"
                >
                    Update Header
                </button>

                {message && (
                    <div className="mt-4">
                        <p>{message}</p>
                    </div>
                )}
            </form>
        </div>
    );
};

export default Header;
