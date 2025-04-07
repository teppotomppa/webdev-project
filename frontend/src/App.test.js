import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders the main menu', () => {
  render(<App />);
  expect(screen.getByText(/Memory Game/i)).toBeInTheDocument();
  expect(screen.getByText(/Select Difficulty/i)).toBeInTheDocument();
  expect(screen.getByText(/Easy/i)).toBeInTheDocument();
  expect(screen.getByText(/Medium/i)).toBeInTheDocument();
  expect(screen.getByText(/Hard/i)).toBeInTheDocument();
});

test('starts a new game when difficulty is selected', () => {
  render(<App />);
  fireEvent.click(screen.getByText(/Easy/i));
  expect(screen.getByText(/Turns:/i)).toBeInTheDocument();
});

test('returns to the main menu when Main Menu button is clicked', () => {
  render(<App />);
  fireEvent.click(screen.getByText(/Easy/i));
  fireEvent.click(screen.getByText(/Main Menu/i));
  expect(screen.getByText(/Select Difficulty/i)).toBeInTheDocument();
});

