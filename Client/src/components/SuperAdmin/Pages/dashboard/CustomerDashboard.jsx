import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerDashboard = () => {
  const [customer, setCustomer] = useState(null);
  const [formData, setFormData] = useState({
    total_restaurants: '',
    total_countries: '',
    total_orders: ''
  });

  useEffect(() => {
    fetchCustomer();
  }, []);

  const fetchCustomer = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/customer');
      setCustomer(response.data);
      setFormData({
        total_restaurants: response.data.total_restaurants || '',
        total_countries: response.data.total_countries || '',
        total_orders: response.data.total_orders || ''
      });
    } catch (error) {
      console.error('Error fetching customer data:', error);
    }
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      const response = await axios.put('http://localhost:5001/api/customer', formData);
      alert('Updated Succesfully'); // Alert for update response
      fetchCustomer(); // Refresh customer data
    } catch (error) {
      alert('Error updating customer data: ' + error.message); // Alert for update error
      console.error('Error updating customer data:', error);
    }
  };

  return (
    <div className="container max-w-4xl p-4">
      <h1 className="text-3xl font-bold mb-4">Customer Dashboard</h1>

      <div className="bg-gray-100 p-4 rounded-lg shadow-md ">
        <h2 className="text-2xl mb-4">Update Customer Data</h2>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Total Restaurants:</label>
            <input
              type="number"
              name="total_restaurants"
              value={formData.total_restaurants}
              onChange={handleFormChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Total Countries:</label>
            <input
              type="number"
              name="total_countries"
              value={formData.total_countries}
              onChange={handleFormChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Total Orders:</label>
            <input
              type="number"
              name="total_orders"
              value={formData.total_orders}
              onChange={handleFormChange}
              className="w-full p-2 border border-gray-300 rounded mt-1"
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleUpdate}
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CustomerDashboard;
