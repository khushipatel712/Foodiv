import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaCog, FaSignOutAlt } from 'react-icons/fa';
import axios from 'axios';
import Cookies from 'js-cookie';

const AdminProfile = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/logout', {}, { withCredentials: true });
      Cookies.remove('token');
      navigate('/admin/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <div className="relative">
      <button onClick={toggleMenu} className="flex items-center space-x-2">
        <FaUser className="text-xl" />
        <span>Admin</span>
      </button>
      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
          <button
            onClick={() => navigate('/superadmin/manage-account')}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
          >
            <FaCog className="inline mr-2" /> Manage Account
          </button>
          <button
            onClick={handleLogout}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
          >
            <FaSignOutAlt className="inline mr-2" /> Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default AdminProfile;