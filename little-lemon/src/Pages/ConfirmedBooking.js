import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './ConfirmedBooking.css';

function ConfirmedBooking() {
  const location = useLocation();
  const navigate = useNavigate();
  const bookingData = location.state?.bookingData || {};
  const confirmationId = location.state?.confirmationId || "412-4394-ad31-ake3";
  
  // Format the date for better display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  };

  return (
    <div className="confirmation-container">
      <h1>Reservation Made!</h1>
      <p className="welcome-message">We can't wait to serve you!</p>
      <p className="confirmation-id">Confirmation #{confirmationId}</p>
      
      <h2>Reservation Details</h2>
      
      <div className="reservation-details">
        <p><strong>Date:</strong> {formatDate(bookingData.date)} @ {bookingData.time}</p>
        <p><strong>Guests:</strong> {bookingData.guests} Guests</p>
        <p><strong>Special Requests:</strong> {bookingData.specialRequests || 'None'}</p>
        
        <p className="email-notification">
          A confirmation has also been sent to your email.
        </p>
      </div>
      
      <div className="button-container">
        <button 
          onClick={() => navigate('/booking')}
          className="action-button"
        >
          MODIFY
        </button>
        
        <button 
          onClick={() => navigate('/')}
          className="action-button"
        >
          HOME
        </button>
      </div>
    </div>
  );
}

export default ConfirmedBooking;