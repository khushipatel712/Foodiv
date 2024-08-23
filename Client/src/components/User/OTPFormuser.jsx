import React, { useState } from 'react';
import { useUserRegister } from '../contexts/userRegisterContext';

const OTPFormuser = ({ onNext, onPrev }) => {
  const { userRegisterData } = useUserRegister();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const handleVerifyOtp = async () => {
    if (!userRegisterData || !userRegisterData.email) {
      setError('User data is missing. Please start the registration process again.');
      return;
    }

    if (!otp) {
      setError('OTP is required.');
      return;
    }

    const payload = {
      email: userRegisterData?.email, // Use optional chaining to avoid undefined errors
      otp: otp
    };
    
    try {
      const response = await fetch('http://localhost:5001/api/verify-otpuser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
    
      if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}, Details: ${errorDetails}`);
      }
    
      console.log('OTP verified successfully');
      onNext();
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="modal-content">
      <h2 className="text-2xl font-bold mb-4">Verify OTP</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="mb-4">
          <label htmlFor="otp" className="block text-gray-700 mb-2">Enter OTP</label>
          <input
            type="text"
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="border border-gray-300 rounded-sm px-3 py-2 w-full"
            required
          />
        </div>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <div className="flex justify-between">
          <button
            type="button"
            onClick={onPrev}
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded"
          >
            Back
          </button>
          <button
            type="button"
            onClick={handleVerifyOtp}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            Verify OTP
          </button>
        </div>
      </form>
    </div>
  );
};

export default OTPFormuser;
