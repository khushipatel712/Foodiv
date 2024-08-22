// src/components/LoginForm.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLoginMutation } from '../../services/adminApi';
import Cookies from 'js-cookie';
import logo from 'D:/Node and React/Foodiv/Client/public/assests/lg.svg';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
  
    try {
      const response = await login(formData).unwrap();
  
      console.log('token', response); 
      
      if (response) {
        Cookies.set('token', response.token , { expires: 1 }); 
        navigate('/admin/dashboard');
      } else {
        setError('Login failed. Please check your credentials and try again.');
      }
    } catch (err) {
      console.error('Login failed:', err.message || 'Unknown error');
      setError('Login failed. Please check your credentials and try again.');
    }
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
        <div className="flex justify-center mb-6">
          <img src={logo} alt="Foodiv" className="h-12" />
        </div>
        <h2 className="text-center text-2xl font-semibold text-gray-700 mb-6">Login</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Email or Phone Number</label>
            <div className="flex items-center border border-gray-300 rounded-md">
              <span className="px-3 py-2 bg-gray-100 text-gray-600 rounded-l-md">
                {/* Email Icon */}
              </span>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email or Phone Number"
                className="w-full px-3 py-2 text-gray-700 border-l border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
            <div className="flex items-center border border-gray-300 rounded-md">
              <span className="px-3 py-2 bg-gray-100 text-gray-600 rounded-l-md">
                {/* Password Icon */}
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Password"
                className="w-full px-3 py-2 text-gray-700 border-l border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <span className="px-3 py-2 bg-gray-100 text-gray-600 rounded-r-md cursor-pointer">
                {/* Toggle Password Visibility Icon */}
              </span>
            </div>
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <button
            type="submit"
            className={`w-full py-2 text-white bg-orange-500 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Logging In...' : 'Login'}
          </button>
        </form>

        <div className="mt-6 flex justify-between">
          <Link to="/forgot-password" className="text-sm text-orange-500 hover:underline">Forgot Password?</Link>
          <Link to="/register" className="text-sm text-orange-500 hover:underline">Sign Up</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
