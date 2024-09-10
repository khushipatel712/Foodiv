import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SetupDashboard = () => {
    const [setupData, setSetupData] = useState({
        title: '',
        description: '',
        setup: []
    });
    const [newSetupItems, setNewSetupItems] = useState([]);
    const [logoPreviews, setLogoPreviews] = useState([]);

    useEffect(() => {
        fetchSetup();
    }, []);

    const fetchSetup = () => {
        axios.get('http://localhost:5001/api/setup')
            .then((res) => {
                if (res.data) {
                    setSetupData(res.data);
                }
            })
            .catch((err) => console.error('Error fetching data:', err));
    };

    const handleInputChange = (index, e) => {
        const { name, value } = e.target;
        const updatedSetupItems = [...newSetupItems];
        updatedSetupItems[index] = { ...updatedSetupItems[index], [name]: value };
        setNewSetupItems(updatedSetupItems);
    };

    const handleLogoChange = (index, e) => {
        const file = e.target.files[0];
        if (file) {
            const logoUrl = URL.createObjectURL(file);
            const updatedPreviews = [...logoPreviews];
            updatedPreviews[index] = logoUrl;
            setLogoPreviews(updatedPreviews);

            const updatedSetupItems = [...newSetupItems];
            updatedSetupItems[index] = { ...updatedSetupItems[index], logo: file };
            setNewSetupItems(updatedSetupItems);
        }
    };

    const addNewSetupFields = () => {
        setNewSetupItems(prev => [...prev, { title: '', alt_tag: '', description: '', logo: null }]);
        setLogoPreviews(prev => [...prev, '']);
    };

    const removeNewSetupItem = (index) => {
        const updatedSetupItems = newSetupItems.filter((_, i) => i !== index);
        const updatedPreviews = logoPreviews.filter((_, i) => i !== index);
        setNewSetupItems(updatedSetupItems);
        setLogoPreviews(updatedPreviews);
    };

    const handleRemoveExisting = (id) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this setup item?');

        if (isConfirmed) {
            axios.delete(`http://localhost:5001/api/setup/${id}`)
                .then(() => {
                    fetchSetup(); 
                })
                .catch((err) => console.error('Error deleting setup item:', err));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Combine existing setup items with new items
        const combinedSetupItems = [...setupData.setup, ...newSetupItems];

        const formData = new FormData();
        formData.append('title', setupData.title);
        formData.append('description', setupData.description);

        combinedSetupItems.forEach((item, index) => {
            formData.append(`setup[${index}][title]`, item.title);
            formData.append(`setup[${index}][alt_tag]`, item.alt_tag);
            formData.append(`setup[${index}][description]`, item.description);
            if (item.logo) {
                formData.append(`setup[${index}][logo]`, item.logo);
            }
        });

        axios.put('http://localhost:5001/api/setup', formData, {  // Use POST to add new items
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(() => {
            alert('Data updated successfully!');
            fetchSetup(); // Refresh the data
            setNewSetupItems([]); // Clear the new setup form
            setLogoPreviews([]); // Clear logo previews
        })
        .catch((err) => console.error('Error updating data:', err));
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-6">Setup Dashboard</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="mb-6">
                    <label className="block text-sm font-medium">Title</label>
                    <input
                        type="text"
                        value={setupData.title}
                        onChange={(e) => setSetupData({ ...setupData, title: e.target.value })}
                        className="mt-1 block w-full p-2 border rounded-md"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium">Description</label>
                    <textarea
                        value={setupData.description}
                        onChange={(e) => setSetupData({ ...setupData, description: e.target.value })}
                        className="mt-1 block w-full p-2 border rounded-md"
                        required
                    />
                </div>

                <h3 className="text-xl font-semibold mb-4">Existing Setup Items</h3>
                {setupData.setup.map((item, index) => (
                    <div key={item._id} className="border p-4 mb-4 rounded-md">
                        <h4 className="text-lg font-semibold">Setup Item {index + 1}</h4>
                        <p><strong>Title:</strong> {item.title}</p>
                        <p><strong>Alt Tag:</strong> {item.alt_tag}</p>
                        <p><strong>Description:</strong> {item.description}</p>
                        <img
                            src={`http://localhost:5001/public/images/${item.logo}`}
                            alt={`Logo ${index + 1}`}
                            className="mt-2 w-32 h-32 object-cover"
                        />
                        <button
                            type="button"
                            onClick={() => handleRemoveExisting(item._id)}
                            className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 mt-4"
                        >
                            Remove
                        </button>
                    </div>
                ))}

                <h3 className="text-xl font-semibold mt-8 mb-4">Add New Setup Items</h3>
                {newSetupItems.map((item, index) => (
                    <div key={index} className="border p-4 mb-4 rounded-md">
                        <h4 className="text-lg font-semibold">New Setup Item {index + 1}</h4>
                        <div className="mb-2">
                            <label className="block text-sm font-medium">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={item.title || ''}
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
                                value={item.alt_tag || ''}
                                onChange={(e) => handleInputChange(index, e)}
                                className="mt-1 block w-full p-2 border rounded-md"
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-sm font-medium">Description</label>
                            <textarea
                                name="description"
                                value={item.description || ''}
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
                            onClick={() => removeNewSetupItem(index)}
                            className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 mt-2"
                        >
                            Remove
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addNewSetupFields}
                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
                >
                    Add New Item
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

export default SetupDashboard;
