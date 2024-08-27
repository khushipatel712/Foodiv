import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import Cookies from 'js-cookie';

const LoginModal = ({ onClose, adminId }) => { // Accept adminId as a prop
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch(`http://localhost:5001/api/user/login/${adminId}`, { // Include adminId in URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Pass email and password in the body
      });


      if (response.ok) {
        const data = await response.json();
        // console.log(data);
        Cookies.set('userToken', data.token, { path: '/' }); // Set the token in a cookie
        onClose(); // Close the modal after successful login
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Login failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
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
        <h2 className="text-2xl text-center font-bold mb-4">Login</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 text-sm mb-2">Email</label>
            <input
              type="email"
              id="email"
              className="border border-gray-300 rounded-sm px-3 py-2 w-full"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-2 text-sm">Password</label>
            <input
              type="password"
              id="password"
              className="border border-gray-300 rounded-sm px-3 py-2 w-full"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <div className="flex flex-col space-y-4 mb-4">
            <div className='flex justify-end'>
              <a href="#" className="text-orange-500 hover:text-orange-600 text-sm">Forgot Password?</a>
            </div>
            <div className='flex justify-center'>
              <button
                type="submit"
                className="bg-white hover:bg-orange-600 text-orange-600 border-orange-600 border-2 hover:text-white px-4 py-2 rounded transition"
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;
