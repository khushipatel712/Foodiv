import React, { useEffect, useState } from 'react';
import { useUpdateProfileMutation, useGetProfileQuery } from '../../services/adminApi'; 
import { FaCamera } from 'react-icons/fa';
import Cookies from 'js-cookie';

const AdminDetail = () => {

  const token = Cookies.get('token'); 

// console.log('react:', token)
  // Fetch profile data using the token
  const { data: profileData, isSuccess } = useGetProfileQuery(token); 
  const [updateProfile] = useUpdateProfileMutation(); 
  const [formData, setFormData] = useState({
    restaurantName: '',
    email: '',
    mobileNumber: '',
    state: '',
    area: '',
    city: '',
    address: '',
    latitude: '',
    longitude: '',
    domain: ''
  });
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (isSuccess && profileData) {
      setFormData({
        restaurantName: profileData.restaurantName,
        email: profileData.email,
        mobileNumber: profileData.mobileNumber,
        state: profileData.state,
        area: profileData.area,
        city: profileData.city,
        address: profileData.address,
        latitude: profileData.latitude,
        longitude: profileData.longitude,
        domain: profileData.domain,
      });
    }
  }, [profileData, isSuccess]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleImageRemove = () => {
    setImage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    if (image) data.append('image', image);

    try {
      await updateProfile(data).unwrap();
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };


  
  if (!profileData) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-2">Edit Profile</h2>
      <p className="text-gray-500 mb-4">Set Up Your Personal Information</p>
      
      <div className="flex items-center mb-4">
        <div className="relative">
          <img 
            src={profileData.image || 'https://via.placeholder.com/100'} 
            alt="Profile" 
            className="w-24 h-24 object-cover rounded-full border border-gray-300"
          />
          <button 
            className="absolute top-0 right-0 bg-red-500 rounded-full px-2 text-white"
            onClick={handleImageRemove}
          >
            X
          </button>
          <label className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-1 text-white cursor-pointer">
            <FaCamera />
            <input type="file" accept=".jpg,.jpeg,.png" className="hidden" onChange={handleImageChange} />
          </label>
        </div>
        <div className="ml-4 text-gray-500">
          <p>Only jpg, jpeg or png are allowed.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input 
            type="text" 
            name="restaurantName"
            value={formData.restaurantName}
            onChange={handleChange}
            placeholder="Restaurant Name" 
            className="p-2 border border-gray-300 rounded"
          />
          <input 
            type="email" 
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email" 
            className="p-2 border border-gray-300 rounded"
          />
          <div className="flex items-center border border-gray-300 rounded">
            <span className="p-2 bg-gray-100 border-r border-gray-300">+91</span>
            <input 
              type="text" 
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              placeholder="Mobile Number" 
              className="p-2 flex-1"
            />
          </div>
          <input 
            type="text" 
            name="state"
            value={formData.state}
            onChange={handleChange}
            placeholder="State" 
            className="p-2 border border-gray-300 rounded"
          />
          <input 
            type="text" 
            name="area"
            value={formData.area}
            onChange={handleChange}
            placeholder="Area" 
            className="p-2 border border-gray-300 rounded"
          />
          <input 
            type="text" 
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="City" 
            className="p-2 border border-gray-300 rounded"
          />
          <input 
            type="text" 
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Address" 
            className="p-2 border border-gray-300 rounded"
          />
          <input 
            type="text" 
            name="latitude"
            value={formData.latitude}
            onChange={handleChange}
            placeholder="Latitude" 
            className="p-2 border border-gray-300 rounded"
          />
          <input 
            type="text" 
            name="longitude"
            value={formData.longitude}
            onChange={handleChange}
            placeholder="Longitude" 
            className="p-2 border border-gray-300 rounded"
          />
        </div>
        
        <div className="mb-4">
          <p className="font-semibold">Domain:</p>
          <p className="text-gray-700">{formData.domain}</p>
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-gray-500 text-white px-3 py-2 text-xs font-medium rounded-3xl hover:bg-gray-700"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminDetail;
