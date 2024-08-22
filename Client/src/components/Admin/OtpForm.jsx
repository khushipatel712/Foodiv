import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRegisterContext } from '../contexts/RegisterContext';
import logo from 'D:/Node and React/Foodiv/Client/public/assests/lg.svg';

const OTPForm = () => {
  const { registerData } = useRegisterContext();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Validate if registerData is available
  useEffect(() => {
    if (!registerData.email) {
      setError('Registration data is missing.');
    }
  }, [registerData]);

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otp) {
      setError('OTP is required.');
      return;
    }

    // Prepare the request body
    const requestBody = {
      otp,
      email: registerData.email,
      restaurantName: registerData.restaurantName,
      mobileNumber: registerData.mobileNumber,
      password: registerData.password,
      country: registerData.country,
      countryCode: registerData.countryCode,
    };

    try {
      const response = await fetch('http://localhost:5001/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
      });

      if (response.ok) {
        navigate('/admin/login'); // Ensure this route exists
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Foodiv" className="h-12" />
        </div>
        <h2 className="text-center text-2xl font-semibold text-gray-700 mb-6">Verify OTP</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Enter OTP</label>
            <div className="flex border border-gray-300 rounded-md">
              <input
                type="text"
                placeholder="Enter 4-digit OTP"
                maxLength="4"
                value={otp}
                onChange={handleChange}
                className="w-full px-3 py-2 text-gray-700 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-2 text-white bg-orange-500 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
          >
            Verify OTP
          </button>
        </form>

        <div className="mt-6 flex justify-between">
          <Link to="/resend-otp" className="text-sm text-orange-500 hover:underline">Resend OTP</Link>
         
        </div>
      </div>
    </div>
  );
};

export default OTPForm;
