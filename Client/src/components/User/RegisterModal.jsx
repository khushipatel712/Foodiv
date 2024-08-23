import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { useUserRegister } from '../contexts/userRegisterContext';
import OTPModal from './OTPFormuser'; // Adjust import path as needed
import PasswordModal from './SetPasswordModal'; // Adjust import path as needed

const RegisterModal = ({ onClose }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { setUserRegisterData, currentStep, setCurrentStep } = useUserRegister();

  const handleSendOtp = async () => {
    if (!fullName || !email) {
      setError('Both fields are required.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/api/registeruser', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error('Failed to send OTP');
      }

      setUserRegisterData({ fullName, email });
      console.log('OTP sent successfully');
      setCurrentStep(2); // Move to the OTP step
      onClose(); // Close RegisterModal
    } catch (error) {
      setError(error.message);
    }
  };

  const handleBack = () => {
    setCurrentStep(1); // Go back to the initial step
    onClose(); // Close RegisterModal
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={onClose}></div>
      <div className="bg-white rounded-lg shadow-lg p-8 relative max-w-sm w-full">
        <button className="absolute top-2 right-2 text-orange-400" onClick={onClose}>
          <IoMdClose size={20} />
        </button>
        <h2 className="text-2xl text-center font-bold mb-4">Register</h2>
        {currentStep === 1 && (
          <div>
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 text-sm mb-2">Full Name</label>
                <input
                  type="text"
                  id="name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="border border-gray-300 rounded-sm px-3 py-2 w-full"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 mb-2 text-sm">Email Address</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-gray-300 rounded-sm px-3 py-2 w-full"
                  required
                />
              </div>
              {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
              <div className='flex justify-center'>
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="bg-white hover:bg-orange-600 text-orange-600 border-orange-600 border-2 hover:text-white px-4 py-2 rounded transition"
                >
                  Send OTP
                </button>
              </div>
            </form>
          </div>
        )}
        {currentStep === 2 && (
          <OTPModal
            onNext={() => setCurrentStep(3)}
            onPrev={() => setCurrentStep(1)}
          />
        )}
        {currentStep === 3 && (
          <PasswordModal
            onPrev={() => setCurrentStep(2)}
          />
        )}
      </div>
    </div>
  );
};

export default RegisterModal;
