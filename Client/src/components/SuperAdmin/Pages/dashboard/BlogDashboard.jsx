import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Use `useNavigate` for React Router v6
import { FaEdit, FaTrash } from 'react-icons/fa';

const BlogDashboard = () => {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate(); // Use `useNavigate` instead of `useHistory`

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const response = await axios.get('http://localhost:5001/api/blogs');
            // console.log(response)
            setBlogs(response.data);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    };

    const handleDelete = async (id) => {
        const isConfirmed = window.confirm('Are you sure you want to delete this blog?');
        if (isConfirmed) {
            try {
                await axios.delete(`http://localhost:5001/api/blogs/${id}`);
                fetchBlogs();
            } catch (error) {
                console.error('Error deleting blog:', error);
            }
        }
    };

    const handleEdit = (slug) => {
        navigate(`/superadmin/blog/edit-blog/${slug}`); // Use `navigate` for redirection
    };

    const handleAdd = () => {
        navigate('/superadmin/blog/add-blog'); // Use `navigate` for redirection
    };

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Blog Dashboard</h1>
            <button
                onClick={handleAdd}
                className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Add Blog
            </button>
            <table className="min-w-full divide-y divide-gray-200">
                <thead>
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {blogs.map(blog => (
                        <tr key={blog._id}>
                            <td className="px-6 py-4 whitespace-nowrap">{blog.title}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{blog.slug}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <img src={`http://localhost:5001/${blog.photo}`} alt={blog.title} className="w-24 h-16 object-cover" />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <button
                                    onClick={() => handleEdit(blog.slug)}
                                    className="text-blue-500 hover:text-blue-700"
                                >
                                    <FaEdit className="inline mr-2" /> Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(blog._id)}
                                    className="text-red-500 hover:text-red-700 ml-4"
                                >
                                    <FaTrash className="inline mr-2" /> Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BlogDashboard;
