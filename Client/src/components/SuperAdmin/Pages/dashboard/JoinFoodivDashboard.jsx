import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JoinFoodivDashboard = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    altTag: '',
    image: null,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState(null); // New state for image preview

  // Fetch the existing JoinFoodiv entry when the component mounts
  useEffect(() => {
    const fetchJoinFoodiv = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/join-foodiv');
        setFormData({
          title: response.data.title,
          description: response.data.description,
          altTag: response.data.altTag,
          image: null, 
        });
        setImagePreview(`http://localhost:5001/${response.data.image}`); // Set initial image preview if available
      } catch (error) {
        console.error('Error fetching JoinFoodiv data:', error);
      }
    };

    fetchJoinFoodiv();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      const file = files[0];
      setFormData({
        ...formData,
        image: file,
      });

      // Create a URL for the image file to show a preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setIsSuccess(false);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('altTag', formData.altTag);
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      await axios.put('http://localhost:5001/api/join-foodiv', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

    //   setMessage('Entry updated successfully');
    alert('Entry Updated Successfully');
      setIsSuccess(true);
    } catch (error) {
      console.error('Error updating JoinFoodiv entry:', error);
      setMessage('Error updating entry');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-12">
      <h2 className="text-3xl font-bold mb-8 text-center text-indigo-600">Join Foodiv Dashboard</h2>
      {/* {message && (
        <p className={`text-center mb-6 ${isSuccess ? 'text-green-500' : 'text-red-500'}`}>
          {message}
        </p>
      )} */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="4"
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Alt Tag</label>
          <input
            type="text"
            name="altTag"
            value={formData.altTag}
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Image</label>
          <input
            type="file"
            name="image"
            onChange={handleChange}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        {imagePreview && (
          <div className="mt-4">
            <p className="text-sm font-medium text-gray-700">Image Preview:</p>
            <img
              src={imagePreview}
              alt={formData.altTag}
              className="mt-2 w-48 h-48 object-cover border border-gray-300 rounded-md"
            />
          </div>
        )}

        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-6 py-2 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            disabled={loading}
          >
            {loading ? 'Updating...' : 'Update'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default JoinFoodivDashboard;
