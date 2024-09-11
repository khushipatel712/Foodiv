import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const RatingDashboard = () => {
  const [ratings, setRatings] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRatings();
  }, []);

  const fetchRatings = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/ratings');
      setRatings(response.data || []);
    } catch (error) {
      console.error('Error fetching ratings:', error);
      setRatings([]);
    }
  };

  const handleDelete = async (id) => {
    const isConfirmed = window.confirm('Are you sure you want to delete this rating?');
    
    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:5001/api/ratings/${id}`);
        fetchRatings(); // Refresh the ratings list after deletion
      } catch (error) {
        console.error('Error deleting rating:', error);
      }
    }
  };

  const handleEdit = (rating) => {
    navigate(`/superadmin/ratings/edit-rating/${rating._id}`);
  };

  const handleAdd = () => {
    navigate('/superadmin/ratings/add-rating');
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Rating Dashboard</h1>
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 float-right mb-4"
        onClick={handleAdd}
      >
        Add Rating
      </button>

      <table className="min-w-full bg-white rounded-lg shadow-md">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-gray-200 border-b">ID</th>
            <th className="py-2 px-4 bg-gray-200 border-b">Title</th>
            <th className="py-2 px-4 bg-gray-200 border-b">Logo</th>
            <th className="py-2 px-4 bg-gray-200 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {ratings && ratings.length > 0 ? (
            ratings.map((rating) => (
              <tr key={rating._id}>
                <td className="py-2 px-4 border-b">{rating._id}</td>
                <td className="py-2 px-4 border-b">{rating.title}</td>
                <td className="py-2 px-4 border-b">
                  <img src={`http://localhost:5001/${rating.logo}`} alt={rating.alt_tag} className="h-10" />
                </td>
                <td className="py-2 px-4 border-b flex items-center">
                  <button
                    onClick={() => handleEdit(rating)}
                    className="text-blue-500 hover:text-blue-700 mr-4"
                  >
                    <FaEdit />
                  </button>
                  <button
                    onClick={() => handleDelete(rating._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="py-2 px-4 text-center">
                No ratings available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default RatingDashboard;
