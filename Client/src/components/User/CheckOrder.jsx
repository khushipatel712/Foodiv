import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const CheckOrder = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5001/api/order/${id}/check-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ mobileNumber }),
      });
      const data = await response.json();
      if (response.ok && data.length > 0) {
        navigate(`/${id}/user/orders`, { state: { orders: data } });
      } else {
        alert('No orders found for this number.');
      }
    } catch (error) {
      console.error('Error checking order:', error);
      alert('Error checking order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Check Your Order</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="mobileNumber" className="block text-gray-700 text-sm font-bold mb-2">
            Mobile Number
          </label>
          <input
            type="tel"
            id="mobileNumber"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter your mobile number"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={isLoading}
        >
          {isLoading ? 'Checking...' : 'Check Order'}
        </button>
      </form>
    </div>
  );
};

export default CheckOrder;