// contexts/AlertContext.js
import React, { createContext, useState } from 'react';

export const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  const [message, setMessage] = useState(null);
  const [type, setType] = useState(null);

  const showAlert = (message, type) => {
    setMessage(message);
    setType(type);
  };

  const clearAlert = () => {
    setMessage(null);
    setType(null);
  };

  return (
    <AlertContext.Provider value={{ message, type, showAlert, clearAlert }}>
      {children}
    </AlertContext.Provider>
  );
};