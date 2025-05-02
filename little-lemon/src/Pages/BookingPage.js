import React from 'react';
import BookingForm from './BookingForm';
import './BookingForm.css';

function BookingPage({ availableTimes, updateTimes, submitBooking }) {
  return (
    <div className="booking-page" style={{ textAlign: 'center' }}>
      <div className="booking-hero">
        <h1>Reserve a Table</h1>
        <p>Please fill out the form below to book your reservation at Little Lemon.</p>
      </div>
      
      <div className="booking-form-container">
        <h2>Booking Details</h2>
        <BookingForm 
          availableTimes={availableTimes} 
          updateTimes={updateTimes}
          submitBooking={submitBooking}
        />
      </div>
      
      <div className="booking-info">
        <h3>Reservation Information</h3>
        <p>Reservations are available up to 30 days in advance.</p>
        <p>For parties larger than 10 people, please contact us directly at (123) 456-7890.</p>
      </div>
    </div>
  );
}

export default BookingPage;