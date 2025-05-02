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

  // Handle navigation functions with keyboard support
  const handleModify = () => {
    navigate('/reservations');
  };

  const handleHome = () => {
    navigate('/');
  };

  return (
    <main>
      <section 
        className="confirmation-container" 
        aria-labelledby="confirmation-heading"
      >
        <header>
          <h1 id="confirmation-heading">Reservation Made!</h1>
          <p className="welcome-message" role="status">We can't wait to serve you!</p>
        </header>

        <p className="confirmation-id" aria-live="polite">
          Confirmation #{confirmationId}
        </p>
        
        <section aria-labelledby="details-heading">
          <h2 id="details-heading">Reservation Details</h2>
          
          <dl className="reservation-details">
            <div className="detail-item">
              <dt>Date:</dt>
              <dd>{formatDate(bookingData.date)} @ {bookingData.time}</dd>
            </div>
            
            <div className="detail-item">
              <dt>Guests:</dt>
              <dd>{bookingData.guests} Guests</dd>
            </div>
            
            <div className="detail-item">
              <dt>Special Requests:</dt>
              <dd>{bookingData.specialRequests || 'None'}</dd>
            </div>
          </dl>
          
          <p className="email-notification" aria-live="polite">
            A confirmation has also been sent to your email.
          </p>
        </section>
        
        <div 
          className="button-container"
          role="group"
          aria-label="Booking actions"
        >
          <button 
            onClick={handleModify}
            className="action-button"
            aria-label="Modify your reservation"
          >
            MODIFY
          </button>
          
          <button 
            onClick={handleHome}
            className="action-button"
            aria-label="Return to home page"
          >
            HOME
          </button>
        </div>
      </section>
    </main>
  );
}

export default ConfirmedBooking;