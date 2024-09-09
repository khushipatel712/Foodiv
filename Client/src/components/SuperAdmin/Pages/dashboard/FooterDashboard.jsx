import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FooterDashboard = () => {
    const [footerData, setFooterData] = useState({
        logo: '',
        insta_link: '',
        facebook_link: '',
        google_link: '',
        phone1: '',
        email: '',
        address: ''
    });
    const [file, setFile] = useState(null);

    useEffect(() => {
        // Fetch footer data
        axios.get('http://localhost:5001/api/footer')
            .then(res => setFooterData(res.data))
            .catch(err => console.error(err));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFooterData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('logo', file);
        Object.keys(footerData).forEach(key => {
            formData.append(key, footerData[key]);
        });

        axios.post('http://localhost:5001/api/footer', formData)
            .then(res => alert('Footer updated successfully!'))
            .catch(err => console.error(err));
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
            <h2 className="text-2xl font-bold mb-6">Footer Setting</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium">Logo</label>
                    <input
                        type="file"
                        onChange={handleFileChange}
                        className="mt-1 block w-full p-2 border rounded-md"
                    />
                    {footerData.logo && (
                        <img
                            src={`http://localhost:5001/public/images/${footerData.logo}`}
                            alt="Logo"
                            className="mt-2"
                            style={{ maxWidth: '200px' }}
                        />
                    )}
                </div>

                <div>
                    <label className="block text-sm font-medium">Instagram Link</label>
                    <input
                        type="text"
                        name="insta_link"
                        value={footerData.insta_link || ''}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border rounded-md"
                        placeholder="Enter Instagram link"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Facebook Link</label>
                    <input
                        type="text"
                        name="facebook_link"
                        value={footerData.facebook_link || ''}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border rounded-md"
                        placeholder="Enter Facebook link"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Google Link</label>
                    <input
                        type="text"
                        name="google_link"
                        value={footerData.google_link || ''}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border rounded-md"
                        placeholder="Enter Google link"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Phone 1</label>
                    <input
                        type="text"
                        name="phone1"
                        value={footerData.phone1 || ''}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border rounded-md"
                        placeholder="Enter phone number"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={footerData.email || ''}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border rounded-md"
                        placeholder="Enter email address"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Address</label>
                    <textarea
                        name="address"
                        value={footerData.address || ''}
                        onChange={handleChange}
                        className="mt-1 block w-full p-2 border rounded-md"
                        rows="3"
                        placeholder="Enter address"
                    />
                </div>

                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600"
                >
                    Update Footer
                </button>
            </form>
        </div>
    );
};

export default FooterDashboard;
