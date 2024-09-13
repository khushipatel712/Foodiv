import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BecomePartnerDashboard = () => {
    const [becomePartnerData, setBecomePartnerData] = useState({
        title: '',
        description: '',
        setup: []
    });
    const [newPartnerItems, setNewPartnerItems] = useState([]);
    const [logoPreviews, setLogoPreviews] = useState([]);

    useEffect(() => {
        fetchBecomePartnerData();
    }, []);

    const fetchBecomePartnerData = () => {
        axios.get('http://localhost:5001/api/become-partner')
            .then((res) => {
                if (res.data) {
                    setBecomePartnerData({
                        ...res.data,
                        setup: res.data.setup || []
                    });
                }
            })
            .catch((err) => console.error('Error fetching data:', err));
    };

    const handleInputChange = (index, e) => {
        const { name, value } = e.target;
        const updatedPartnerItems = [...newPartnerItems];
        updatedPartnerItems[index] = { ...updatedPartnerItems[index], [name]: value };
        setNewPartnerItems(updatedPartnerItems);
    };

    const handleLogoChange = (index, e) => {
        const file = e.target.files[0];
        if (file) {
            const logoUrl = URL.createObjectURL(file);
            const updatedPreviews = [...logoPreviews];
            updatedPreviews[index] = logoUrl;
            setLogoPreviews(updatedPreviews);

            const updatedPartnerItems = [...newPartnerItems];
            updatedPartnerItems[index] = { ...updatedPartnerItems[index], logo: file };
            setNewPartnerItems(updatedPartnerItems);
        }
    };


    const addNewPartnerFields = () => {
        setNewPartnerItems(prev => [...prev, { title: '', alt_tag: '', description: '', logo: null }]);
        setLogoPreviews(prev => [...prev, '']);
    };

    const removeNewPartnerItem = (index) => {
        const updatedPartnerItems = newPartnerItems.filter((_, i) => i !== index);
        const updatedPreviews = logoPreviews.filter((_, i) => i !== index);
        setNewPartnerItems(updatedPartnerItems);
        setLogoPreviews(updatedPreviews);
    };

    const handleRemoveExisting = (id) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this partner item?');

        if (isConfirmed) {
            axios.delete(`http://localhost:5001/api/become-partner/${id}`)
                .then(() => {
                    fetchBecomePartnerData(); 
                })
                .catch((err) => console.error('Error deleting partner item:', err));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const combinedPartnerItems = [...becomePartnerData.setup, ...newPartnerItems];

        const formData = new FormData();
        formData.append('title', becomePartnerData.title);
        formData.append('description', becomePartnerData.description);

        combinedPartnerItems.forEach((item, index) => {
            formData.append(`setup[${index}][title]`, item.title);
            formData.append(`setup[${index}][alt_tag]`, item.alt_tag);
            formData.append(`setup[${index}][description]`, item.description);
            if (item.logo) {
                formData.append(`setup[${index}][logo]`, item.logo);
            }
        });

        axios.put('http://localhost:5001/api/become-partner', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(() => {
            alert('Data updated successfully!');
            fetchBecomePartnerData();
            setNewPartnerItems([]);
            setLogoPreviews([]);
        })
        .catch((err) => console.error('Error updating data:', err));
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-6">Become Partner Dashboard</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="mb-6">
                    <label className="block text-sm font-medium">Title</label>
                    <input
                        type="text"
                        value={becomePartnerData.title}
                        onChange={(e) => setBecomePartnerData({ ...becomePartnerData, title: e.target.value })}
                        className="mt-1 block w-full p-2 border rounded-md"
                        required
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-medium">Description</label>
                    <textarea
                        value={becomePartnerData.description}
                        onChange={(e) => setBecomePartnerData({ ...becomePartnerData, description: e.target.value })}
                        className="mt-1 block w-full p-2 border rounded-md"
                        required
                    />
                </div>

                <h3 className="text-xl font-semibold mb-4">Existing Partner</h3>
                {becomePartnerData.setup.map((item, index) => (
                    <div key={item._id} className="border p-4 mb-4 rounded-md">
                        <h4 className="text-lg font-semibold">Partner Item {index + 1}</h4>
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

                <h3 className="text-xl font-semibold mt-8 mb-4">Add New Partner</h3>
                {newPartnerItems?.map((item, index) => (
                    <div key={index} className="border p-4 mb-4 rounded-md">
                        <h4 className="text-lg font-semibold">New Partner{index + 1}</h4>
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
                            onClick={() => removeNewPartnerItem(index)}
                            className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 mt-2"
                        >
                            Remove
                        </button>
                    </div>
                ))}
                <button
                    type="button"
                    onClick={addNewPartnerFields}
                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
                >
                    Add New Partner
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 mt-4"
                >
                    Save Changes
                </button>
            </form>
        </div>
    );
};

export default BecomePartnerDashboard;
