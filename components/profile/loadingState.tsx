import React from 'react';


const LoadingModal = ({ message = "Loading...", isOpen = false }) => {
  if (!isOpen) return null; // Only render the modal if isOpen is true

  return (
    <div className="loading-modal-overlay">
      <div className="loading-modal">
        <div className="spinner"></div>
        <p className="loading-message">{message}</p>
      </div>
    </div>
  );
};

export default LoadingModal;
