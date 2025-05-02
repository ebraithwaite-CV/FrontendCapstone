// Function to simulate fetching available reservation times for a given date
function fetchAPI(date) {
    const dayOfWeek = date.getDay();
    
    // Simulate different availability based on the day of the week
    switch (dayOfWeek) {
      case 0: 
        return ['5:30 pm', '6:00 pm', '7:00 pm', '8:00 pm', '9:00 pm'];
      case 5:
      case 6:
        return ['5:00 pm', '7:00 pm', '8:30 pm'];
      default: 
        return ['5:00 pm', '5:30 pm', '6:00 pm', '6:30 pm', '7:00 pm', '7:30 pm', '8:00 pm', '8:30 pm'];
    }
  }
  
  function submitAPI(formData) {
    console.log('Form submitted with data:', formData);
    
    return true;
  }
  
  export { fetchAPI, submitAPI };