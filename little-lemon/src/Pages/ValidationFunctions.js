
export const validateDate = (value) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    if (!value) {
      return 'Date is required';
    }
    
    const selectedDate = new Date(value);
    selectedDate.setHours(0, 0, 0, 0);
    
    const maxDate = new Date(today);
    maxDate.setDate(today.getDate() + 30);
    
    if (selectedDate < today) {
      return 'Date cannot be in the past';
    } else if (selectedDate > maxDate) {
      return 'Reservations are only available up to 30 days in advance';
    }
    return '';
  };
  

  export const validateTime = (value) => {
    if (!value) {
      return 'Please select a time';
    }
    return '';
  };
  

  export const validateGuests = (value) => {
    const numGuests = parseInt(value.split(' ')[0]);
    if (numGuests < 1) {
      return 'Number of guests must be at least 1';
    } else if (numGuests > 10) {
      return 'For parties larger than 10, please contact us directly';
    }
    return '';
  };
  

  export const validateName = (value) => {
    if (!value.trim()) {
      return 'Name is required';
    } else if (value.trim().length < 2) {
      return 'Name must be at least 2 characters';
    }
    return '';
  };
  

  export const validatePhone = (value) => {
    const phoneRegex = /^[\d\s\-\(\)]+$/;
    if (!value.trim()) {
      return 'Phone number is required';
    } else if (!phoneRegex.test(value)) {
      return 'Please enter a valid phone number';
    } else if (value.replace(/\D/g, '').length < 10) {
      return 'Phone number must have at least 10 digits';
    }
    return '';
  };
  

  export const validateEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value.trim()) {
      return 'Email is required';
    } else if (!emailRegex.test(value)) {
      return 'Please enter a valid email address';
    }
    return '';
  };