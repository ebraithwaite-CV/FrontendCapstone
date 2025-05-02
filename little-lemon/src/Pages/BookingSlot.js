import React from 'react';

function BookingSlot({ time, onSelect, isSelected }) {
  return (
    <div 
      className={`booking-slot ${isSelected ? 'selected' : ''}`}
      onClick={() => onSelect(time)}
    >
      {time}
    </div>
  );
}

export default BookingSlot;