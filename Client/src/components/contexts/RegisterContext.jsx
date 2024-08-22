// src/context/RegisterContext.js
import React, { createContext, useContext, useState } from 'react';

const RegisterContext = createContext();

export const RegisterProvider = ({ children }) => {
  const [registerData, setRegisterData] = useState({});

  return (
    <RegisterContext.Provider value={{ registerData, setRegisterData }}>
      {children}
    </RegisterContext.Provider>
  );
};

export const useRegisterContext = () => useContext(RegisterContext);
