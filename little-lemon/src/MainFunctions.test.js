import { initializeTimes, availableTimesReducer } from './Main';
import { fetchAPI } from './api';

jest.mock('./api', () => ({
  fetchAPI: jest.fn(),
  submitAPI: jest.fn()
}));

describe('Main component functions', () => {
  
  beforeEach(() => {
    
    fetchAPI.mockReset();
  });

  test('initializeTimes returns the expected initial time slots from fetchAPI', () => {
    
    const mockTimes = [
      '5:15 pm ET',
      '5:45 pm ET',
      '6:15 pm ET',
      '6:45 pm ET',
      '7:15 pm ET',
      '7:45 pm ET',
      '8:15 pm ET',
      '8:45 pm ET'
    ];
    fetchAPI.mockReturnValue(mockTimes);

    const initialTimes = initializeTimes();
    
    expect(fetchAPI).toHaveBeenCalled();
    expect(fetchAPI.mock.calls[0][0] instanceof Date).toBe(true);
    
    expect(initialTimes).toEqual(mockTimes);
  });

  test('availableTimesReducer returns updated times from fetchAPI when UPDATE_TIMES action is dispatched', () => {
    
    const mockTimes = [
      '6:00 pm ET',
      '7:00 pm ET',
      '8:00 pm ET'
    ];
    fetchAPI.mockReturnValue(mockTimes);
    
    const initialState = ['5:00 pm ET'];
    
    const testDate = new Date('2025-05-15');

    const action = {
      type: 'UPDATE_TIMES',
      payload: testDate
    };
    
    const newState = availableTimesReducer(initialState, action);
    
    expect(fetchAPI).toHaveBeenCalledWith(testDate);
    
    expect(newState).toEqual(mockTimes);
  });

  test('availableTimesReducer handles string dates correctly', () => {

    const mockTimes = [
      '6:30 pm ET',
      '7:30 pm ET',
      '8:30 pm ET'
    ];
    fetchAPI.mockReturnValue(mockTimes);
    
    const initialState = ['5:30 pm ET'];
    
    const stringDate = '2025-05-20';
    
    const action = {
      type: 'UPDATE_TIMES',
      payload: stringDate
    };
    
    const newState = availableTimesReducer(initialState, action);
    
    expect(fetchAPI).toHaveBeenCalled();
    
    expect(newState).toEqual(mockTimes);
  });

  test('initializeTimes returns fallback times when fetchAPI throws an error', () => {
    fetchAPI.mockImplementation(() => {
      throw new Error('API Error');
    });
    
    const fallbackTimes = [
      '5:15 pm ET',
      '5:45 pm ET',
      '6:15 pm ET',
      '6:45 pm ET',
      '7:15 pm ET',
      '7:45 pm ET',
      '8:15 pm ET',
      '8:45 pm ET'
    ];
    
 
    const initialTimes = initializeTimes();
    
    
    expect(initialTimes).toEqual(fallbackTimes);
  });

  
  test('availableTimesReducer returns current state for unknown action types', () => {
    const currentState = ['6:00 pm ET', '7:00 pm ET'];
    
    const action = {
      type: 'UNKNOWN_ACTION'
    };
    
    const newState = availableTimesReducer(currentState, action);
    
    
    expect(newState).toEqual(currentState);

    expect(fetchAPI).not.toHaveBeenCalled();
  });
});