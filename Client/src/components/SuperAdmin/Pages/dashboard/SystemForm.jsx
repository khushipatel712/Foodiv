import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

const SystemForm = () => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(''); // To store the image preview URL
  const [currentImage, setCurrentImage] = useState(''); // To store the current image URL
  const [slug, setSlug] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const navigate = useNavigate();
  const { slug: editSlug } = useParams();

  useEffect(() => {
    if (editSlug) {
      axios.get(`http://localhost:5001/api/systems/${editSlug}`)
        .then((response) => {
          const system = response.data;
          setTitle(system.title);
          setSlug(system.slug);
          setCurrentImage(system.image); // Set the current image URL
          setImagePreview(`http://localhost:5001/${system.image}`); // Set the preview URL
          setIsEditing(true);
        })
        .catch((error) => console.error('Failed to fetch system:', error));
    }
  }, [editSlug]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set the preview URL
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(currentImage); // Revert to the current image if no file is selected
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    if (image) formData.append('image', image); // Attach the new image file if any
    formData.append('slug', slug);

    if (isEditing) {
      axios.put(`http://localhost:5001/api/systems/${slug}`, formData)
        .then(() => {
          navigate('/superadmin/system');
        })
        .catch((error) => console.error('Failed to update system:', error));
    } else {
      axios.post('http://localhost:5001/api/systems/', formData)
        .then(() => {
          navigate('/superadmin/system');
        })
        .catch((error) => console.error('Failed to add system:', error));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">{isEditing ? 'Edit System' : 'Add New System'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Image:</label>
          <input
            type="file"
            onChange={handleImageChange}
            className="mt-1 block w-full"
          />
          <div className="mt-4">
            <label className="block text-gray-700">Image Preview:</label>
            <img
              src={imagePreview || (isEditing ? `http://localhost:5001/${currentImage}` : '')}
              alt="Preview"
              className="mt-1 block w-24 h-24 object-cover"
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Slug:</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
        >
          {isEditing ? 'Update System' : 'Add System'}
        </button>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="ml-4 inline-flex items-center bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default SystemForm;
