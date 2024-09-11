import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ReviewDashboard = () => {
    const [reviewData, setReviewData] = useState({
        title: '',
        image: '',
        reviews: []
    });
    const [newReviewItems, setNewReviewItems] = useState([]);
    const [profilePreviews, setProfilePreviews] = useState([]);
    const [imagePreview, setImagePreview] = useState('');

    useEffect(() => {
        fetchReviews();
    }, []);

    const fetchReviews = () => {
        axios.get('http://localhost:5001/api/reviews')
            .then((res) => {
                if (res.data) {
                    setReviewData(res.data);
                    setImagePreview(`http://localhost:5001/public/images/${res.data.image}`);
                }
            })
            .catch((err) => console.error('Error fetching data:', err));
    };

    const handleInputChange = (index, e) => {
        const { name, value } = e.target;
        const updatedReviewItems = [...newReviewItems];
        updatedReviewItems[index] = { ...updatedReviewItems[index], [name]: value };
        setNewReviewItems(updatedReviewItems);
    };

    const handleProfileChange = (index, e) => {
        const file = e.target.files[0];
        if (file) {
            const profileUrl = URL.createObjectURL(file);
            const updatedPreviews = [...profilePreviews];
            updatedPreviews[index] = profileUrl;
            setProfilePreviews(updatedPreviews);

            const updatedReviewItems = [...newReviewItems];
            updatedReviewItems[index] = { ...updatedReviewItems[index], profile: file };
            setNewReviewItems(updatedReviewItems);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setImagePreview(imageUrl);
            setReviewData({ ...reviewData, image: file });
        }
    };

    const addNewReviewFields = () => {
        setNewReviewItems(prev => [...prev, { title: '', profile: null, alt_tag: '', name: '', address: '', review: '' }]);
        setProfilePreviews(prev => [...prev, '']);
    };

    const removeNewReviewItem = (index) => {
        const updatedReviewItems = newReviewItems.filter((_, i) => i !== index);
        const updatedPreviews = profilePreviews.filter((_, i) => i !== index);
        setNewReviewItems(updatedReviewItems);
        setProfilePreviews(updatedPreviews);
    };

    const handleRemoveExisting = (id) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this review item?');

        if (isConfirmed) {
            axios.delete(`http://localhost:5001/api/reviews/${id}`)
                .then(() => {
                    fetchReviews(); 
                })
                .catch((err) => console.error('Error deleting review item:', err));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', reviewData.title);
        
        if (reviewData.image instanceof File) {
            formData.append('image', reviewData.image);
        } else if (typeof reviewData.image === 'string' && reviewData.image) {
            formData.append('existingImage', reviewData.image);
        }

        const combinedReviewItems = [...reviewData.reviews, ...newReviewItems];

        combinedReviewItems.forEach((item, index) => {
            formData.append(`reviews[${index}][title]`, item.title);
            formData.append(`reviews[${index}][alt_tag]`, item.alt_tag);
            formData.append(`reviews[${index}][name]`, item.name);
            formData.append(`reviews[${index}][address]`, item.address);
            formData.append(`reviews[${index}][review]`, item.review);
            if (item.profile instanceof File) {
                formData.append(`reviews[${index}][profile]`, item.profile);
            } else if (typeof item.profile === 'string' && item.profile) {
                formData.append(`reviews[${index}][existingProfile]`, item.profile);
            }
        });

        // Log formData contents for debugging
        for (let pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }

        axios.put('http://localhost:5001/api/reviews', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(() => {
            alert('Data updated successfully!');
            fetchReviews();
            setNewReviewItems([]);
        })
        .catch((err) => {
            console.error('Error updating data:', err.response ? err.response.data : err);
            alert(err.response ? err.response.data.message : 'An error occurred');
        });
    };


    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-6">Review Dashboard</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="mb-6">
                    <label className="block text-sm font-medium">Title</label>
                    <input
                        type="text"
                        value={reviewData.title}
                        onChange={(e) => setReviewData({ ...reviewData, title: e.target.value })}
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

                <h3 className="text-xl font-semibold mb-4">Existing Review Items</h3>
                {reviewData.reviews.map((item, index) => (
                    <div key={item._id} className="border p-4 mb-4 rounded-md">
                        <h4 className="text-lg font-semibold">Review Item {index + 1}</h4>
                        <p><strong>Title:</strong> {item.title}</p>
                        <p><strong>Alt Tag:</strong> {item.alt_tag}</p>
                        <p><strong>Name:</strong> {item.name}</p>
                        <p><strong>Address:</strong> {item.address}</p>
                        <p><strong>Review:</strong> {item.review}</p>
                        <img
                            src={`http://localhost:5001/public/images/${item.profile}`}
                            alt={`Profile ${index + 1}`}
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

                <h3 className="text-xl font-semibold mt-8 mb-4">Add New Review Items</h3>
                {newReviewItems.map((item, index) => (
                    <div key={index} className="border p-4 mb-4 rounded-md">
                        <h4 className="text-lg font-semibold">New Review Item {index + 1}</h4>
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
                            <label className="block text-sm font-medium">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={item.name || ''}
                                onChange={(e) => handleInputChange(index, e)}
                                className="mt-1 block w-full p-2 border rounded-md"
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-sm font-medium">Address</label>
                            <input
                                type="text"
                                name="address"
                                value={item.address || ''}
                                onChange={(e) => handleInputChange(index, e)}
                                className="mt-1 block w-full p-2 border rounded-md"
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-sm font-medium">Review</label>
                            <textarea
                                name="review"
                                value={item.review || ''}
                                onChange={(e) => handleInputChange(index, e)}
                                className="mt-1 block w-full p-2 border rounded-md"
                                rows="3"
                                required
                            />
                        </div>
                        <div className="mb-2">
                            <label className="block text-sm font-medium">Profile Image</label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleProfileChange(index, e)}
                                className="mt-1 block w-full p-2 border rounded-md"
                            />
                            {profilePreviews[index] && (
                                <img
                                    src={profilePreviews[index]}
                                    alt={`Profile Preview ${index + 1}`}
                                    className="mt-2 w-32 h-32 object-cover"
                                />
                            )}
                        </div>
                        <button
                            type="button"
                            onClick={() => removeNewReviewItem(index)}
                            className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600 mt-4"
                        >
                            Remove This Item
                        </button>
                    </div>
                ))}

                <button
                    type="button"
                    onClick={addNewReviewFields}
                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
                >
                    Add New Review Item
                </button>

                <button
                    type="submit"
                    className="px-4 py-2 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 mt-6"
                >
                    Submit Changes
                </button>
            </form>
        </div>
    );
};

export default ReviewDashboard;
