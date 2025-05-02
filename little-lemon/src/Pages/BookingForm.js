import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function BookingForm({ availableTimes, updateTimes, submitBooking }) {
  const navigate = useNavigate();
  
  // State variables for each form field
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState('4 Guests');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [specialRequests, setSpecialRequests] = useState('');
  const [initialized, setInitialized] = useState(false);
  
  // Available guest options
  const guestOptions = [
    '1 Guest',
    '2 Guests',
    '3 Guests',
    '4 Guests',
    '5 Guests',
    '6 Guests',
    '7 Guests',
    '8 Guests'
  ];

  // One-time initialization on component mount
  useEffect(() => {
    if (!initialized) {
      const today = new Date();
      const formattedDate = today.toISOString().split('T')[0];
      setDate(formattedDate);
      updateTimes(today);
      setInitialized(true);
    }
  }, [initialized, updateTimes]);

  // Update time selection when available times change
  useEffect(() => {
    if (availableTimes.length > 0 && !time) {
      setTime(availableTimes[0]);
    }
  }, [availableTimes, time]);

  // Form submission handler
const handleSubmit = (e) => {
    e.preventDefault();
    
    // Parse the number of guests from the string
    const numGuests = parseInt(guests.split(' ')[0]);
    
    // Create form data object
    const formData = {
      date,
      time,
      guests: numGuests,
      name,
      phone,
      email,
      specialRequests
    };
    
    // Submit form data using the prop function
    submitBooking(formData);
  };

  // Handle date change
  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setDate(newDate);
    
    const dateObj = new Date(newDate);
    updateTimes(dateObj);
  };

  return (
    <form className="booking-form" onSubmit={handleSubmit}>
      <h1>Reserve A Table</h1>
      
      <div className="form-field">
        <label htmlFor="res-date">Date:</label>
        <div className="date-input-container">
          <input 
            type="date" 
            id="res-date" 
            value={date} 
            onChange={handleDateChange}
            required
          />
          <span className="calendar-icon">📅</span>
        </div>
      </div>
      
      <div className="form-field">
        <label htmlFor="res-time">Time:</label>
        <div className="selected-time">
          {time ? time : 'Select a time'}
        </div>
      </div>
      
      {/* Display available slots as visual elements */}
      <div className="available-slots">
        <h3>Available Time Slots:</h3>
        <div className="slots-container">
          {availableTimes.length > 0 ? (
            availableTimes.map(availableTime => (
              <div 
                key={availableTime}
                className={`booking-slot ${time === availableTime ? 'selected' : ''}`}
                onClick={() => setTime(availableTime)}
              >
                {availableTime}
              </div>
            ))
          ) : (
            <p>No available time slots for this date.</p>
          )}
        </div>
      </div>
      
      <div className="form-field">
        <label htmlFor="guests">Guests:</label>
        <select 
          id="guests"
          value={guests} 
          onChange={(e) => setGuests(e.target.value)}
          required
        >
          {guestOptions.map(option => (
            <option key={option}>{option}</option>
          ))}
        </select>
      </div>
      
      <div className="form-field">
        <label htmlFor="name">Name:</label>
        <input 
          type="text" 
          id="name" 
          value={name} 
          onChange={(e) => setName(e.target.value)}
          placeholder="Bill Smith"
          required
        />
      </div>
      
      <div className="form-field">
        <label htmlFor="phone">Phone:</label>
        <input 
          type="tel" 
          id="phone" 
          value={phone} 
          onChange={(e) => setPhone(e.target.value)}
          placeholder="555-555-1234"
          required
        />
      </div>
      
      <div className="form-field">
        <label htmlFor="email">Email:</label>
        <input 
          type="email" 
          id="email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          placeholder="bsmith@gmail.com"
          required
        />
      </div>
      
      <div className="form-field">
        <label htmlFor="special-requests">Special Requests:</label>
        <textarea
          id="special-requests"
          value={specialRequests}
          onChange={(e) => setSpecialRequests(e.target.value)}
          rows="4"
        />
      </div>
      
      <button type="submit" className="reserve-button">RESERVE</button>
    </form>
  );
}

export default BookingForm;