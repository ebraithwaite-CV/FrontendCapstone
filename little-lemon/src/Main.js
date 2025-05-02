import React, { useReducer } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import BookingPage from './Pages/BookingPage';
import AboutPage from './Pages/AboutPage';
import MenuPage from './Pages/MenuPage';
import OrderOnlinePage from './Pages/OrderOnlinePage';
import LoginPage from './Pages/LoginPage';
import ConfirmedBooking from './Pages/ConfirmedBooking';
import { fetchAPI, submitAPI } from './api';
import './Main.css';

export const initializeTimes = () => {
  const today = new Date();
  
  try {
    return fetchAPI(today);
  } catch (error) {
    console.error("Error fetching initial times:", error);
    return [
      '5:15 pm ET',
      '5:45 pm ET',
      '6:15 pm ET',
      '6:45 pm ET',
      '7:15 pm ET',
      '7:45 pm ET',
      '8:15 pm ET',
      '8:45 pm ET'
    ];
  }
};

export const availableTimesReducer = (state, action) => {
  switch(action.type) {
    case 'UPDATE_TIMES':
      try {
        
        const selectedDate = action.payload;
       
        const dateObj = typeof selectedDate === 'string' 
          ? new Date(selectedDate) 
          : selectedDate;
        
        return fetchAPI(dateObj);
      } catch (error) {
        console.error("Error updating times:", error);
        return state;
      }
    default:
      return state;
  }
};

export const submitForm = (formData) => {
  try {
    return submitAPI(formData);
  } catch (error) {
    console.error("Error submitting form:", error);
    return false;
  }
};

function Main() {
  const navigate = useNavigate(); 
  const [availableTimes, dispatchAvailableTimes] = useReducer(
    availableTimesReducer,
    [],
    initializeTimes
  );

  const updateTimes = (date) => {
    dispatchAvailableTimes({ type: 'UPDATE_TIMES', payload: date });
  };

  const submitBooking = (formData) => {
    const success = submitForm(formData);
    
    if (success) {
      const confirmationId = Math.random().toString(36).substring(2, 6) + '-' +
                            Math.random().toString(36).substring(2, 6) + '-' +
                            Math.random().toString(36).substring(2, 6) + '-' +
                            Math.random().toString(36).substring(2, 6);
      
      navigate('/confirmed-booking', { 
        state: { 
          bookingData: formData,
          confirmationId: confirmationId
        } 
      });
      
      return true;
    }
    
    return false;
  };

  return (
    <main className="main">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route 
          path="/reservations" 
          element={
            <BookingPage 
              availableTimes={availableTimes} 
              updateTimes={updateTimes}
              submitBooking={submitBooking}
            />
          } 
        />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/order-online" element={<OrderOnlinePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/confirmed-booking" element={<ConfirmedBooking />} />
      </Routes>
    </main>
  );
}

export default Main;