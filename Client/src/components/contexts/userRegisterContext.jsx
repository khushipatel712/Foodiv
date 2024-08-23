import React, { createContext, useContext, useState } from 'react';

const UserRegisterContext = createContext();

export const UserRegisterProvider = ({ children }) => {
  const [userRegisterData, setUserRegisterData] = useState({});
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <UserRegisterContext.Provider value={{ userRegisterData, setUserRegisterData, currentStep, setCurrentStep }}>
      {children}
    </UserRegisterContext.Provider>
  );
};

export const useUserRegister = () => useContext(UserRegisterContext);
