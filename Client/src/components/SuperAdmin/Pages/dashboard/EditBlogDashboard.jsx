import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 

const EditBlog = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [blog, setBlog] = useState({
        title: '',
        date: '',
        details: '',
        photo: null,
        alt: '',
        postedBy: '',
        status: '',
        blog: '',
        headline: '',
        restaurantName: '',
        slug: ''
    });
    const [file, setFile] = useState(null);
    const [blogs, setBlogs] = useState([]);
    const [previewImage, setPreviewImage] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchBlogs();
        if (slug) {
            fetchBlog(slug);
        }
    }, [slug]);

    const fetchBlogs = async () => {
        try {
            const response = await axios.get('http://localhost:5001/api/blogdetails');
            setBlogs(response.data);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    };

    const fetchBlog = async (slug) => {
        try {
            const response = await axios.get(`http://localhost:5001/api/blogs/slug/${slug}`);
            const fetchedBlog = response.data;
            setBlog({
                ...fetchedBlog,
                blog: fetchedBlog.blog ? fetchedBlog.blog._id : '', // Store the blog ID directly
                headline: fetchedBlog.headline || '' // Set headline if it exists
            });
            if (fetchedBlog.photo) {
                setPreviewImage(`http://localhost:5001/${fetchedBlog.photo}`);
            }
        } catch (error) {
            console.error('Error fetching blog:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBlog(prevBlog => ({ ...prevBlog, [name]: value }));
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        setBlog(prevBlog => ({ ...prevBlog, photo: selectedFile }));
        if (selectedFile) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleQuillChange = (value) => {
        setBlog(prevBlog => ({ ...prevBlog, details: value }));
    };

    const handleBlogSelect = (e) => {
        const value = e.target.value;
        setBlog(prevBlog => ({ ...prevBlog, blog: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        const formData = new FormData();
        Object.keys(blog).forEach(key => {
            if (key === 'photo' && blog[key] instanceof File) {
                formData.append('photo', blog[key]);
            } else if (blog[key] !== null && blog[key] !== undefined) {
                formData.append(key, blog[key]);
            }
        });

        try {
            if (slug) {
                await axios.put(`http://localhost:5001/api/blogs/slug/${slug}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                await axios.post('http://localhost:5001/api/blogs', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }
            navigate('/superadmin/blog');
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setError('Slug already in use');
            } else {
                console.error('Error saving blog:', error);
            }
        }
    };

    return (
        <div className="p-4 max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">{slug ? 'Edit Blog' : 'Add Blog'}</h1>
            {error && <div className="bg-red-100 text-red-700 p-4 mb-4 rounded">{error}</div>}
            <div className="mb-4">
                <label className="block mb-2">Select Existing Blog</label>
                <select
                    value={blog.blog}
                    onChange={handleBlogSelect}
                    className="w-full p-2 border rounded"
                >
                    <option value="">-- Select a blog --</option>
                    {blogs.map((blogItem) => (
                        <option key={blogItem._id} value={blogItem._id}>
                            {blogItem.category}
                        </option>
                    ))}
                </select>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-2">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={blog.title}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2">Date</label>
                    <input
                        type="date"
                        name="date"
                        value={blog.date}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2">Details</label>
                    <ReactQuill 
                        value={blog.details}
                        onChange={handleQuillChange}
                        className="w-full"
                    />
                </div>
                <div>
                    <label className="block mb-2">Headline</label>
                    <input
                        type="text"
                        name="headline"
                        value={blog.headline}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2">Image</label>
                    <input
                        type="file"
                        name="photo"
                        onChange={handleFileChange}
                        className="w-full p-2 border rounded"
                    />
                    {previewImage && (
                        <img src={previewImage} alt="Preview" className="mt-2 w-32 h-32 object-cover" />
                    )}
                </div>
                <div>
                    <label className="block mb-2">Alt Text</label>
                    <input
                        type="text"
                        name="alt"
                        value={blog.alt}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                </div>
                <div>
                    <label className="block mb-2">Posted By</label>
                    <input
                        type="text"
                        name="postedBy"
                        value={blog.postedBy}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2">Status</label>
                    <input
                        type="text"
                        name="status"
                        value={blog.status}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2">Restaurant Name</label>
                    <input
                        type="text"
                        name="restaurantName"
                        value={blog.restaurantName}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <div>
                    <label className="block mb-2">Slug</label>
                    <input
                        type="text"
                        name="slug"
                        value={blog.slug}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    {slug ? 'Update Blog' : 'Add Blog'}
                </button>
            </form>
        </div>
    );
};

export default EditBlog;
