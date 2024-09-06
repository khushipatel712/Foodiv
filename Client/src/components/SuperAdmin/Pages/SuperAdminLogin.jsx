import React, { useState } from 'react';
import { FaArrowLeft } from "react-icons/fa6";
import Cookies from 'js-cookie'


const SuperAdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Handle form submission
  const handleLogin = async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch('http://localhost:5001/api/superadmin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Correct content type for JSON
        },
        body: JSON.stringify({ email, password }), // Send data as JSON
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        Cookies.set('superadminToken', data.superadmintoken, { path: '/' });
        window.location.reload();
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg border border-gray-300">
       <div>
          <div className="text-2xl font-semibold text-center mb-2">Login</div>
        </div>


        <form onSubmit={handleLogin}>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center">
            <button type="button" className="text-orange-500 hover:text-orange-700 mb-4 sm:mb-0">
              Forgot Password?
            </button>
            <button
              type="submit"
              className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg border border-orange-500"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SuperAdminLogin;
