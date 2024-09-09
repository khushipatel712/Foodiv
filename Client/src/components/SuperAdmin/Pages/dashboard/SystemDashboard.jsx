// src/components/SystemDashboard.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SystemDashboard = () => {
  const [systems, setSystems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5001/api/systems/')
      .then((response) => {
        console.log('API Response:', response.data); // Check API response
        setSystems(Array.isArray(response.data) ? response.data : []); // Ensure data is an array
      })
      .catch((error) => console.error('Failed to fetch systems:', error));
  }, []);

  const handleEditClick = (system) => {
    navigate(`/superadmin/systems/update/${system.slug}`); // Navigate to edit form with system slug
  };

  const handleDelete = (slug) => {
    axios.delete(`http://localhost:5001/api/systems/${slug}`)
      .then(() => {
        setSystems(systems.filter(system => system.slug !== slug));
        alert('System deleted successfully!');
      })
      .catch((error) => console.error('Failed to delete system:', error));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <button
        onClick={() => navigate('/superadmin/systems/add')}
        className="mb-6 inline-flex items-center bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition"
      >
        <FaPlus className="mr-2" /> Add New System
      </button>

      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {systems.map((system) => (
            <tr key={system._id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{system._id}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{system.title}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => handleEditClick(system)}
                  className="text-indigo-600 hover:text-indigo-900 mr-4"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(system.slug)}
                  className="text-red-600 hover:text-red-900"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SystemDashboard;
