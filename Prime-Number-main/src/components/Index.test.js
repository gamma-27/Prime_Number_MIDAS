// Index.test.js
import React from 'react';
import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import Index from './index'; // Import the Index component
jest.mock('axios');
// Import Axios

// Mock Axios to avoid real HTTP requests
jest.mock('axios');

// Unit test for rendering the component
test('renders the form elements correctly', () => {
  render(<Index />);
  
  // Check if input fields and buttons are in the document
  expect(screen.getByLabelText(/Enter the starting range:/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Enter the ending range:/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/Enter the algorithm type:/i)).toBeInTheDocument();
  expect(screen.getByText(/Generate/i)).toBeInTheDocument();
});

// Test for input change
test('changes the input values when user types', () => {
  render(<Index />);

  fireEvent.change(screen.getByLabelText(/Enter the starting range:/i), {
    target: { value: '10' },
  });
  fireEvent.change(screen.getByLabelText(/Enter the ending range:/i), {
    target: { value: '50' },
  });

  expect(screen.getByLabelText(/Enter the starting range:/i).value).toBe('10');
  expect(screen.getByLabelText(/Enter the ending range:/i).value).toBe('50');
});

// Test for calling the API and updating the state
test('fetches and displays prime numbers correctly', async () => {
  // Mock the API response
  axios.post.mockResolvedValue({
    data: {
      primes: [2, 3, 5, 7],
      numPrimes: 4,
    },
  });

  render(<Index />);

  fireEvent.change(screen.getByLabelText(/Enter the starting range:/i), {
    target: { value: '1' },
  });
  fireEvent.change(screen.getByLabelText(/Enter the ending range:/i), {
    target: { value: '10' },
  });
  fireEvent.change(screen.getByLabelText(/Enter the algorithm type:/i), {
    target: { value: 'A' },
  });

  // Trigger fetch action (button click)
  fireEvent.click(screen.getByText(/Generate/i));

  // Wait for API call to resolve and check the displayed result
  await waitFor(() => {
    expect(screen.getByText(/Prime numbers between 1 and 10 are/i)).toBeInTheDocument();
    expect(screen.getByText(/Algorithm used: A/i)).toBeInTheDocument();
    expect(screen.getByText(/Count of prime numbers: 4/i)).toBeInTheDocument();
  });
});

// Test for error handling in case of API failure
test('shows error when the API call fails', async () => {
  // Mock the API response to simulate an error
  axios.post.mockRejectedValue(new Error('API Error'));

  render(<Index />);

  fireEvent.change(screen.getByLabelText(/Enter the starting range:/i), {
    target: { value: '1' },
  });
  fireEvent.change(screen.getByLabelText(/Enter the ending range:/i), {
    target: { value: '10' },
  });
  fireEvent.change(screen.getByLabelText(/Enter the algorithm type:/i), {
    target: { value: 'A' },
  });

  fireEvent.click(screen.getByText(/Generate/i));

  // Check for error message
  await waitFor(() => {
    expect(screen.getByText(/Error fetching prime numbers:/i)).toBeInTheDocument();
  });
});
