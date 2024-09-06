import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaLock, FaCamera } from 'react-icons/fa';
import axios from 'axios';
import Cookies from 'js-cookie';
const token = Cookies.get('superadminToken');

const AdminAccount = () => {
  const [profile, setProfile] = useState({
    email: '',
    image: '',
  });
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  useEffect(() => {
    // Fetch admin profile data
    const fetchProfile = async () => {
      try {
       
        const token = Cookies.get('superadminToken'); // Assuming your token is saved in a cookie named 'token'
        if (token) {
          const response = await axios.get('http://localhost:5001/api/superadmin/get', {
            withCredentials: true,  
            headers: {
              Authorization: token,  
            },
          });

          setProfile(response.data);  
        } else {
          console.error('No token found in cookies');
        }
      } catch (error) {
        console.error('Failed to fetch profile:', error);
      }
    };

    fetchProfile();
  }, []);



  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('email', profile.email);
      if (profile.image) {
        formData.append('image', profile.image);
      }
  
      await axios.put(
        'http://localhost:5000/api/superadmin/update',
        formData,
        {
          headers: {
            'Authorization': token,
            'Content-Type': 'multipart/form-data'
          },
          withCredentials: true
        }
      );
      
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Failed to update profile');
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    try {
      await axios.put('http://localhost:5000/api/admin/change-password', 
        { currentPassword: password, newPassword }, 
        { withCredentials: true }
      );
      alert('Password changed successfully');
      setIsChangingPassword(false);
      setPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      console.error('Failed to change password:', error);
      alert('Failed to change password');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfile({ ...profile, image: file });
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold text-orange-600 mb-6">Manage Account</h2>
        
        <form onSubmit={handleUpdateProfile} className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img 
                src={profile.image || 'https://via.placeholder.com/150'} 
                alt="Admin" 
                className="w-32 h-32 rounded-full object-cover"
              />
              <label htmlFor="image-upload" className="absolute bottom-0 right-0 bg-orange-500 text-white p-2 rounded-full cursor-pointer">
                <FaCamera />
              </label>
              <input 
                id="image-upload" 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange} 
                className="hidden" 
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="text-gray-400" />
                </div>
                <input
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  className="focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                  placeholder="admin@example.com"
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
            >
              Update Profile
            </button>
          </div>
        </form>

        <div className="mt-8">
          <button
            onClick={() => setIsChangingPassword(!isChangingPassword)}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
          >
            {isChangingPassword ? 'Cancel' : 'Change Password'}
          </button>
        </div>

        {isChangingPassword && (
          <form onSubmit={handleChangePassword} className="mt-6 space-y-6">
            <div>
              <label htmlFor="current-password" className="block text-sm font-medium text-gray-700">Current Password</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  id="current-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div>
              <label htmlFor="new-password" className="block text-sm font-medium text-gray-700">New Password</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div>
              <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm New Password</label>
              <div className="mt-1 relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="text-gray-400" />
                </div>
                <input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="focus:ring-orange-500 focus:border-orange-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
              >
                Update Password
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default AdminAccount;