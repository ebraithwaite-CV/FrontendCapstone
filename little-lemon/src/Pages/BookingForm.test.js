import { render, screen } from "@testing-library/react";
import BookingForm from './BookingForm';
import { BrowserRouter } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

const mockProps = {
  availableTimes: ['5:15 pm ET', '6:15 pm ET', '7:15 pm ET'],
  updateTimes: jest.fn(),
  submitBooking: jest.fn()
};

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, { wrapper: BrowserRouter });
};

describe('BookingForm Component', () => {
  test('Renders the BookingForm heading', () => {
    renderWithRouter(<BookingForm {...mockProps} />);
    const headingElement = screen.getByText("Reserve A Table");
    expect(headingElement).toBeInTheDocument();
  });

  test('Renders the time slots section heading', () => {
    renderWithRouter(<BookingForm {...mockProps} />);
    const timeSlotsHeading = screen.getByText("Available Time Slots:");
    expect(timeSlotsHeading).toBeInTheDocument();
  });

  test('Renders the form labels correctly', () => {
    renderWithRouter(<BookingForm {...mockProps} />);
    const dateLabel = screen.getByText("Date:");
    const timeLabel = screen.getByText("Time:");
    const guestsLabel = screen.getByText("Guests:");
    const nameLabel = screen.getByText("Name:");
    
    expect(dateLabel).toBeInTheDocument();
    expect(timeLabel).toBeInTheDocument();
    expect(guestsLabel).toBeInTheDocument();
    expect(nameLabel).toBeInTheDocument();
  });

  test('Renders the submit button with correct text', () => {
    renderWithRouter(<BookingForm {...mockProps} />);
    const submitButton = screen.getByText("RESERVE");
    expect(submitButton).toBeInTheDocument();
  });

  test('Displays time slots correctly', () => {
    renderWithRouter(<BookingForm {...mockProps} />);
    
    mockProps.availableTimes.forEach(time => {
      const timeSlot = screen.getByText(time);
      expect(timeSlot).toBeInTheDocument();
    });
  });

  test('Initializes with default values', () => {
    renderWithRouter(<BookingForm {...mockProps} />);
    
    expect(mockProps.updateTimes).toHaveBeenCalled();
    
    const guestsSelect = screen.getByLabelText("Guests:");
    expect(guestsSelect.value).toBe("4 Guests");
  });
});