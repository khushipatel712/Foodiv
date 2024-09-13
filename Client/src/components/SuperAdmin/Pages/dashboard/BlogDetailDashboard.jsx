import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BlogDetailDashboard = () => {
    const [blogDetails, setBlogDetails] = useState([]);
    const [newCategory, setNewCategory] = useState('');
    const [editCategory, setEditCategory] = useState('');
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchBlogDetails();
    }, []);

    const fetchBlogDetails = () => {
        axios.get('http://localhost:5001/api/blogdetails')
            .then(res => setBlogDetails(res.data))
            .catch(err => console.error('Error fetching blog details:', err));
    };

    const handleCreate = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5001/api/blogdetails', { category: newCategory })
            .then(() => {
                fetchBlogDetails();
                setNewCategory('');
            })
            .catch(err => console.error('Error creating blog detail:', err));
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put(`http://localhost:5001/api/blogdetails/${editId}`, { category: editCategory })
            .then(() => {
                alert('Blog Updated Succesfully')
                fetchBlogDetails();
                setEditCategory('');
                setEditId(null);
            })
            .catch(err => console.error('Error updating blog detail:', err));
    };

    const handleDelete = (id) => {
    
        const isConfirmed = window.confirm('Are you sure you want to delete this blog detail?');
   
        if (isConfirmed) {
            axios.delete(`http://localhost:5001/api/blogdetails/${id}`)
                .then(() => fetchBlogDetails())
                .catch(err => console.error('Error deleting blog detail:', err));
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-6">Blog Details Dashboard</h2>

            <form onSubmit={editId ? handleUpdate : handleCreate} className="space-y-6 mb-8">
                <div className="mb-6">
                    <label className="block text-sm font-medium">Category</label>
                    <input
                        type="text"
                        value={editId ? editCategory : newCategory}
                        onChange={(e) => editId ? setEditCategory(e.target.value) : setNewCategory(e.target.value)}
                        className="mt-1 block w-full p-2 border rounded-md"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className={`px-4 py-2 ${editId ? 'bg-yellow-500' : 'bg-blue-500'} text-white font-semibold rounded-md hover:bg-opacity-80`}
                >
                    {editId ? 'Update' : 'Create'} Category
                </button>
            </form>

            <h3 className="text-xl font-semibold mb-4">Existing Categories</h3>
            <ul className="space-y-4">
                {blogDetails.map(detail => (
                    <li key={detail._id} className="border p-4 rounded-md">
                        <p><strong>Category:</strong> {detail.category}</p>
                        <div className="mt-4 flex space-x-2">
                            <button
                                onClick={() => {
                                    setEditCategory(detail.category);
                                    setEditId(detail._id);
                                }}
                                className="px-4 py-2 bg-yellow-500 text-white font-semibold rounded-md hover:bg-yellow-600"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(detail._id)}
                                className="px-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BlogDetailDashboard;
