import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  validateDate,
  validateTime,
  validateGuests,
  validateName,
  validatePhone,
  validateEmail
} from './ValidationFunctions';
import './BookingForm.css';

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
  
  // Form validation states
  const [touchedFields, setTouchedFields] = useState({
    date: false,
    time: false,
    guests: false,
    name: false,
    phone: false,
    email: false
  });
  
  const [formErrors, setFormErrors] = useState({
    date: '',
    time: '',
    guests: '',
    name: '',
    phone: '',
    email: ''
  });
  
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
  
  // Run validation when field value changes
  useEffect(() => {
    if (touchedFields.date) {
      setFormErrors(prev => ({ ...prev, date: validateDate(date) }));
    }
  }, [date, touchedFields.date]);
  
  useEffect(() => {
    if (touchedFields.time) {
      setFormErrors(prev => ({ ...prev, time: validateTime(time) }));
    }
  }, [time, touchedFields.time]);
  
  useEffect(() => {
    if (touchedFields.guests) {
      setFormErrors(prev => ({ ...prev, guests: validateGuests(guests) }));
    }
  }, [guests, touchedFields.guests]);
  
  useEffect(() => {
    if (touchedFields.name) {
      setFormErrors(prev => ({ ...prev, name: validateName(name) }));
    }
  }, [name, touchedFields.name]);
  
  useEffect(() => {
    if (touchedFields.phone) {
      setFormErrors(prev => ({ ...prev, phone: validatePhone(phone) }));
    }
  }, [phone, touchedFields.phone]);
  
  useEffect(() => {
    if (touchedFields.email) {
      setFormErrors(prev => ({ ...prev, email: validateEmail(email) }));
    }
  }, [email, touchedFields.email]);
  
  // Handle field blur to mark fields as touched
  const handleBlur = (field) => {
    setTouchedFields(prev => ({ ...prev, [field]: true }));
  };
  
  // Check if the form is valid
  const isFormValid = () => {
    const errors = {
      date: validateDate(date),
      time: validateTime(time),
      guests: validateGuests(guests),
      name: validateName(name),
      phone: validatePhone(phone),
      email: validateEmail(email)
    };
    
    // Update the errors state
    setFormErrors(errors);
    
    // Mark all fields as touched
    setTouchedFields({
      date: true,
      time: true,
      guests: true,
      name: true,
      phone: true,
      email: true
    });
    
    // Return true if no errors
    return !Object.values(errors).some(error => error !== '');
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields before submission
    if (!isFormValid()) {
      // Scroll to the first error
      const firstErrorField = document.querySelector('.error-message');
      if (firstErrorField) {
        firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    
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
    const success = submitBooking(formData);
    
    if (!success) {
      alert('Something went wrong. Please try again.');
    }
    // No need for else block as submitBooking will handle navigation on success
  };

  // Handle date change
  const handleDateChange = (e) => {
    const newDate = e.target.value;
    setDate(newDate);
    
    const dateObj = new Date(newDate);
    updateTimes(dateObj);
  };

  // Handle keyboard navigation for time slots
  const handleTimeSlotKeyDown = (e, availableTime) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault(); // Prevent page scroll on space key
      setTime(availableTime);
      setTouchedFields(prev => ({ ...prev, time: true }));
    }
  };

  return (
    <section className="reservation-section">
      <form 
        className="booking-form" 
        onSubmit={handleSubmit} 
        noValidate
        aria-labelledby="booking-form-title"
      >
        <h1 id="booking-form-title">Reserve A Table</h1>
        
        {/* Date Field */}
        <div className={`form-field ${formErrors.date ? 'field-error' : ''}`}>
          <label htmlFor="res-date">Date:</label>
          <div className="date-input-container">
            <input 
              type="date" 
              id="res-date" 
              name="res-date"
              value={date} 
              onChange={handleDateChange}
              onBlur={() => handleBlur('date')}
              min={new Date().toISOString().split('T')[0]}
              max={new Date(new Date().setDate(new Date().getDate() + 30)).toISOString().split('T')[0]}
              required
              aria-invalid={!!formErrors.date}
              aria-describedby={formErrors.date ? "date-error" : undefined}
            />
            <span className="calendar-icon" aria-hidden="true">📅</span>
          </div>
          {formErrors.date && touchedFields.date && (
            <p className="error-message" id="date-error" role="alert">{formErrors.date}</p>
          )}
        </div>
        
        {/* Time Field */}
        <div className={`form-field ${formErrors.time ? 'field-error' : ''}`}>
          <label id="time-label">Time:</label>
          <div 
            className="selected-time"
            aria-live="polite"
            aria-atomic="true"
          >
            {time ? time : 'Select a time'}
          </div>
          {formErrors.time && touchedFields.time && (
            <p className="error-message" id="time-error" role="alert">{formErrors.time}</p>
          )}
        </div>
        
        {/* Available Time Slots */}
        <fieldset className="available-slots">
          <legend>Available Time Slots:</legend>
          <div 
            className="slots-container"
            role="radiogroup"
            aria-labelledby="time-label"
            aria-required="true"
          >
            {availableTimes.length > 0 ? (
              availableTimes.map(availableTime => (
                <div 
                  key={availableTime}
                  className={`booking-slot ${time === availableTime ? 'selected' : ''}`}
                  onClick={() => {
                    setTime(availableTime);
                    setTouchedFields(prev => ({ ...prev, time: true }));
                  }}
                  onKeyDown={(e) => handleTimeSlotKeyDown(e, availableTime)}
                  role="radio"
                  aria-checked={time === availableTime}
                  tabIndex={time === availableTime ? 0 : -1}
                  aria-label={`Select time: ${availableTime}`}
                >
                  {availableTime}
                </div>
              ))
            ) : (
              <p>No available time slots for this date.</p>
            )}
          </div>
        </fieldset>
        
        {/* Guests Field */}
        <div className={`form-field ${formErrors.guests ? 'field-error' : ''}`}>
          <label htmlFor="guests">Guests:</label>
          <select 
            id="guests"
            name="guests"
            value={guests} 
            onChange={(e) => setGuests(e.target.value)}
            onBlur={() => handleBlur('guests')}
            required
            aria-invalid={!!formErrors.guests}
            aria-describedby={formErrors.guests ? "guests-error" : undefined}
          >
            {guestOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          {formErrors.guests && touchedFields.guests && (
            <p className="error-message" id="guests-error" role="alert">{formErrors.guests}</p>
          )}
        </div>
        
        {/* Name Field */}
        <div className={`form-field ${formErrors.name ? 'field-error' : ''}`}>
          <label htmlFor="name">Name:</label>
          <input 
            type="text" 
            id="name"
            name="name"
            value={name} 
            onChange={(e) => setName(e.target.value)}
            onBlur={() => handleBlur('name')}
            placeholder="Bill Smith"
            required
            minLength="2"
            aria-invalid={!!formErrors.name}
            aria-describedby={formErrors.name ? "name-error" : undefined}
          />
          {formErrors.name && touchedFields.name && (
            <p className="error-message" id="name-error" role="alert">{formErrors.name}</p>
          )}
        </div>
        
        {/* Phone Field */}
        <div className={`form-field ${formErrors.phone ? 'field-error' : ''}`}>
          <label htmlFor="phone">Phone:</label>
          <input 
            type="tel" 
            id="phone"
            name="phone"
            value={phone} 
            onChange={(e) => setPhone(e.target.value)}
            onBlur={() => handleBlur('phone')}
            placeholder="555-555-1234"
            required
            pattern="^[\d\s\-\(\)]+$"
            aria-invalid={!!formErrors.phone}
            aria-describedby={formErrors.phone ? "phone-error" : undefined}
          />
          {formErrors.phone && touchedFields.phone && (
            <p className="error-message" id="phone-error" role="alert">{formErrors.phone}</p>
          )}
        </div>
        
        {/* Email Field */}
        <div className={`form-field ${formErrors.email ? 'field-error' : ''}`}>
          <label htmlFor="email">Email:</label>
          <input 
            type="email" 
            id="email"
            name="email"
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => handleBlur('email')}
            placeholder="bsmith@gmail.com"
            required
            aria-invalid={!!formErrors.email}
            aria-describedby={formErrors.email ? "email-error" : undefined}
          />
          {formErrors.email && touchedFields.email && (
            <p className="error-message" id="email-error" role="alert">{formErrors.email}</p>
          )}
        </div>
        
        {/* Special Requests Field */}
        <div className="form-field">
          <label htmlFor="special-requests">Special Requests:</label>
          <textarea
            id="special-requests"
            name="special-requests"
            value={specialRequests}
            onChange={(e) => setSpecialRequests(e.target.value)}
            rows="4"
            maxLength="250"
            aria-describedby="requests-description"
          />
          <p id="requests-description" className="char-count">{specialRequests.length}/250 characters</p>
        </div>
        
        {/* Submit Button */}
        <button 
          type="submit" 
          className="reserve-button"
          disabled={availableTimes.length === 0}
          aria-label="Submit reservation request"
        >
          RESERVE
        </button>
      </form>
    </section>
  );
}

export default BookingForm;