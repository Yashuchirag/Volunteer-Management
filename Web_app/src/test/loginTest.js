import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginForm from '.main/login';

describe('LoginForm Component', () => {
    let onLoginMock;

    beforeEach(() => {
        // Setup a mock function for onLogin
        onLoginMock = jest.fn();
    });

    it('allows a user to sign up and then log in with new credentials', async () => {
        render(<LoginForm onLogin={onLoginMock} />);

        // Sign up
        const emailInput = screen.getByPlaceholderText('Email Id');
        const passwordInput = screen.getByPlaceholderText('Password');
        const signUpButton = screen.getAllByText('Sign up')[0];

        userEvent.type(emailInput, 'test@example.com');
        userEvent.type(passwordInput, 'password');
        userEvent.click(signUpButton);

        // Check if the message is displayed
        expect(screen.getByText('Email: test@example.com signed up successfully.')).toBeInTheDocument();

        // Clear input for next test
        fireEvent.change(emailInput, { target: { value: '' } });
        fireEvent.change(passwordInput, { target: { value: '' } });

        // Log in
        userEvent.type(emailInput, 'test@example.com');
        userEvent.type(passwordInput, 'password');
        const loginButton = screen.getAllByText('Log in')[0];
        userEvent.click(loginButton);

        // Check if the login was successful
        expect(screen.getByText('Email: test@example.com logged in successfully.')).toBeInTheDocument();
        expect(onLoginMock).toHaveBeenCalledWith('test@example.com');
    });

    it('displays an error message if login with incorrect details', async () => {
        render(<LoginForm onLogin={onLoginMock} />);

        // Try to log in with incorrect credentials
        const emailInput = screen.getByPlaceholderText('Email Id');
        const passwordInput = screen.getByPlaceholderText('Password');
        const loginButton = screen.getAllByText('Log in')[0];

        userEvent.type(emailInput, 'wrong@example.com');
        userEvent.type(passwordInput, 'wrongpassword');
        userEvent.click(loginButton);

        // Check for error message
        expect(screen.getByText('Incorrect login details or user not signed up.')).toBeInTheDocument();
        expect(onLoginMock).not.toHaveBeenCalled();
    });
});

