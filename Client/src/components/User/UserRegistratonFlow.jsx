import React from 'react';
import { useUserRegister } from '../contexts/userRegisterContext';
import RegisterModal from './RegisterModal';
import OTPForm from './OTPFormuser';
import SetPasswordForm from './SetPasswordModal';

const UserRegistrationFlow = () => {
  const { currentStep, setCurrentStep } = useUserRegister();

  const handleClose = () => {
    setCurrentStep(1); // Optionally reset to the first step
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50" onClick={handleClose}></div>
      <div className="bg-white rounded-lg shadow-lg p-8 relative max-w-sm w-full">
        {currentStep === 1 && <RegisterModal onClose={handleClose} />}
        {currentStep === 2 && <OTPForm onClose={handleClose} />}
        {currentStep === 3 && <SetPasswordForm onClose={handleClose} />}
      </div>
    </div>
  );
};

export default UserRegistrationFlow;
