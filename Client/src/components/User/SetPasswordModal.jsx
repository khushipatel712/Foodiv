import React, { useState, useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { useUserRegister } from '../contexts/userRegisterContext'; // Adjust the path as necessary
import logo from 'D:/Node and React/Foodiv/Client/public/assests/lg.svg';

const SetPasswordModal = ({ onClose }) => {
  const { registerData } = useUserRegister(); // Use the correct context
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!registerData.email) {
      setError('Registration data is missing.');
    }
  }, [registerData]);

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleChangeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setError('Both password fields are required.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    const requestBody = {
      email: registerData.email,
      password,
    };

    try {
      const response = await fetch('http://localhost:5001/api/set-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        navigate('/dashboard'); // Redirect to dashboard
      } else {
        setError('Failed to set password. Please try again.');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white rounded-lg shadow-lg p-8 relative max-w-sm w-full">
        <button
          className="absolute top-2 right-2 text-orange-400"
          onClick={onClose}
        >
          <IoMdClose size={20} />
        </button>
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Foodiv" className="h-12" />
        </div>
        <h2 className="text-2xl text-center font-semibold text-gray-700 mb-6">Set Your Password</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <div className="flex border border-gray-300 rounded-md">
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={handleChangePassword}
                className="w-full px-3 py-2 text-gray-700 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
            <div className="flex border border-gray-300 rounded-md">
              <input
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={handleChangeConfirmPassword}
                className="w-full px-3 py-2 text-gray-700 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full py-2 text-white bg-orange-500 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50"
          >
            Set Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default SetPasswordModal;
