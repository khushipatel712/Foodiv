import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import Cookies from 'js-cookie'; // Import the cookie library

const RegisterModal = ({ onClose, adminId }) => { // Pass adminId as a prop
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSendOtp = async () => {
    if (!name || !email) {
      setError('Name and email are required.');
      return;
    }
    try {
      const response = await fetch('http://localhost:5001/api/registeruser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email }),
      });
      if (response.ok) {
        setStep(2);
        setError('');
      } else {
        setError('Failed to send OTP. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp) {
      setError('OTP is required.');
      return;
    }
    try {
      const response = await fetch('http://localhost:5001/api/verify-otpuser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });
      if (response.ok) {
        setStep(3);
        setError('');
      } else {
        setError('Invalid OTP. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  const handleSetPassword = async () => {
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    try {
      const response = await fetch(`http://localhost:5001/api/createuser/${adminId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        Cookies.set('token', data.token); // Set the token in a cookie

        onClose(); // Close the modal after successful registration
      } else {
        setError('Failed to register. Please try again.');
      }
    } catch (error) {
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

        {step === 1 && (
          <>
            <h2 className="text-2xl text-center font-semibold text-gray-700 mb-6">Register</h2>
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 mb-3 border rounded"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 mb-3 border rounded"
            />
            <button
              onClick={handleSendOtp}
              className="w-full py-2 text-white bg-orange-500 rounded hover:bg-orange-600"
            >
              Send OTP
            </button>
          </>
        )}
        {step === 2 && (
          <>
            <h2 className="text-2xl text-center font-semibold text-gray-700 mb-6">Verify OTP</h2>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-3 py-2 mb-3 border rounded"
            />
            <button
              onClick={handleVerifyOtp}
              className="w-full py-2 text-white bg-orange-500 rounded hover:bg-orange-600"
            >
              Verify OTP
            </button>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="text-2xl text-center font-semibold text-gray-700 mb-6">Set Password</h2>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 mb-3 border rounded"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 py-2 mb-3 border rounded"
            />
            <button
              onClick={handleSetPassword}
              className="w-full py-2 text-white bg-orange-500 rounded hover:bg-orange-600"
            >
              Set Password
            </button>
          </>
        )}

        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default RegisterModal;
