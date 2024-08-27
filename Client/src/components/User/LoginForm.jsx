import React, { useState } from 'react';
import { FaArrowLeft } from "react-icons/fa6";
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie'


const LoginForm = ({ goBack }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const { id }= useParams()
  const adminId =id

  // Handle form submission
  const handleLogin = async (event) => {
    event.preventDefault(); 
   
  
    console.log(adminId)
    try {
      const response = await fetch(`http://localhost:5001/api/user/login/${adminId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        Cookies.set('userToken', data.token, { path: '/' }); 
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
    <div className="w-full lg:w-[70%] bg-white p-5 lg:p-10 rounded-lg shadow">
      {/* Back Button */}
      <div className='px-32'>
        <div className='flex flex-row gap-4 items-center'>
          <div>
            <button
              className="hover:text-blue-700 mb-4"
              onClick={goBack}
            >
              <FaArrowLeft />
            </button>
          </div>
          <div className="text-lg font-medium mb-4">Login</div>
        </div>
        
        {/* Login Form */}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>

          <div className='flex justify-between'>
            <div>
              <button type="button" className="w-full text-orange-500">
                Forgot Password?
              </button>
            </div>

            <div>
              <button type="submit"  className="w-full bg-white hover:text-white text-orange-500 px-4 py-2 rounded-lg border border-orange-500 hover:bg-orange-500">
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
