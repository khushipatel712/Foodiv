import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useGetProfileQuery } from '../../services/adminApi';
import Cookies from 'js-cookie';

const CustomerSupport = () => {
  const token = Cookies.get('token');

  const [customerCareNumber, setCustomerCareNumber] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const { data: profile } = useGetProfileQuery(token);

  const adminId = profile?.id; // Replace with actual adminId

  // Fetch existing support details
  useEffect(() => {
    const fetchSupportDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/support/${adminId}`);
        if (response.data.length > 0) {
          const support = response.data[0]; // Assuming you get an array of supports
          setCustomerCareNumber(support.customerCareNumber);
          setWhatsappNumber(support.mobileNumber); // Assuming whatsappNumber is stored as mobileNumber
        }
      } catch (error) {
        console.error('Error fetching support details:', error);
      }
    };

    if (adminId) {
      fetchSupportDetails();
    }
  }, [adminId]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const supportDetails = {
        customerCareNumber,
        mobileNumber: whatsappNumber, // Assuming whatsappNumber is stored as mobileNumber
      };

      const response = await axios.get(`http://localhost:5001/api/support/${adminId}`);
      if (response.data.length > 0) {
        // If support entry exists, update it
        const existingSupportId = response.data[0]._id;
        await axios.put(`http://localhost:5001/api/support/${adminId}/${existingSupportId}`, supportDetails);
        alert('Support details updated successfully!');
      } else {
        // If no support entry exists, create a new one
        await axios.post(`http://localhost:5001/api/support/${adminId}`, supportDetails);
        alert('Support details saved successfully!');
      }
    } catch (error) {
      console.error('Error saving support details:', error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-lg font-semibold mb-4">Support Settings</h2>

      <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Customer Care Number</label>
          <div className="flex items-center border border-gray-300">
            <span className="px-3 py-2 bg-gray-100 text-gray-600">
              +91
            </span>
            <input
              type="text"
              className="w-full border-gray-300 p-2 text-gray-700"
              value={customerCareNumber}
              onChange={(e) => setCustomerCareNumber(e.target.value)}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Whatsapp Number</label>
          <div className="flex items-center border border-gray-300">
            <span className="px-3 py-2 bg-gray-100 text-gray-600">
              +91
            </span>
            <input
              type="text"
              className="w-full border-gray-300 p-2 text-gray-700"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
            />
          </div>
        </div>

        <div className="md:col-span-2">
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

export default CustomerSupport;
