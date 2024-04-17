import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import App from './main/App';
import LoginForm from './main/login';

// Mock the child components
jest.mock('./login', () => {
  return {
    __esModule: true,
    default: jest.fn(() => <div>LoginForm component</div>)
  };
});

jest.mock('./homepage', () => {
  return {
    __esModule: true,
    default: jest.fn(({ user }) => <div>Welcome to Homepage, {user}</div>)
  };
});

describe('App Component', () => {
  test('renders LoginForm when no user is logged in', () => {
    render(<App />);
    expect(screen.getByText('LoginForm component')).toBeInTheDocument();
  });

  test('renders Homepage and passes correct props when user logs in', () => {
    render(<App />);

    // Simulate login
    LoginForm.mock.calls[0][0].onLogin('john@example.com');

    // Check if the Homepage is rendered with the correct user
    expect(screen.getByText('Welcome to Homepage, john')).toBeInTheDocument();
  });
});

