// AlertMessage.jsx
import React, { useContext } from 'react';
import { AlertContext } from '../contexts/AlertContext';

const AlertMessage = () => {
  const { message, type, clearAlert } = useContext(AlertContext);

  return (
    <div className={`alert alert-${type}`}>
      <span>{message}</span>
      <button onClick={clearAlert}>Close</button>
    </div>
  );
};

export default AlertMessage;