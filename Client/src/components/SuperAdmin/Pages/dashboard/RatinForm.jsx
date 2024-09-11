import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const RatingForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    alt_tag: '',
    rating: '',
    logo: null,
  });
  const [previewUrl, setPreviewUrl] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      fetchRating(id);
    }
  }, [id]);

  const fetchRating = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5001/api/ratings/${id}`);
      setFormData({
        title: response.data.title || '',
        alt_tag: response.data.alt_tag || '',
        rating: response.data.rating || '',
        logo: null, // Do not pre-fill logo
      });
      setPreviewUrl(response.data.logo || ''); // Set the preview URL from the existing logo if available
    } catch (error) {
      console.error('Error fetching rating:', error);
    }
  };

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'logo') {
      const file = files[0];
      setFormData({ ...formData, logo: file });
      setPreviewUrl(URL.createObjectURL(file)); // Create a preview URL for the selected file
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('alt_tag', formData.alt_tag);
    formDataToSend.append('rating', formData.rating);
    if (formData.logo) formDataToSend.append('logo', formData.logo);

    try {
      if (id) {
        // Update existing rating
        await axios.put(`http://localhost:5001/api/ratings/${id}`, formDataToSend);
      } else {
        // Add new rating
        await axios.post('http://localhost:5001/api/ratings', formDataToSend);
      }
      navigate('/superadmin/ratings'); // Redirect to the dashboard after form submission
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  };

  return (
    <div className="container max-w-4xl  p-4">
      <h1 className="text-3xl font-bold mb-4">{id ? 'Update Rating' : 'Add Rating'}</h1>
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleFormChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Alt Tag:</label>
            <input
              type="text"
              name="alt_tag"
              value={formData.alt_tag}
              onChange={handleFormChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Rating:</label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleFormChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Logo:</label>
            <input
              type="file"
              name="logo"
              onChange={handleFormChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
            {previewUrl && (
              <div className="mt-4">
                <img src={previewUrl} alt="Logo preview" className="h-32 w-32 object-cover rounded" />
              </div>
            )}
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => navigate('/superadmin/ratings')}
              className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            >
              {id ? 'Update Rating' : 'Add Rating'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RatingForm;
