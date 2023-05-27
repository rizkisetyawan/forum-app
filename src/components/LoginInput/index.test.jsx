import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginInput from './index';

import '@testing-library/jest-dom';

/**
 * skenario testing
 *
 * - LoginInput component
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call login function when login button is clicked
 */

describe('LoginInput component', () => {
  it('should handle email typing correctly', async () => {
    // Arrange
    await act(async () => render(<LoginInput onLogin={() => {}} />));
    const emailInput = await screen.getByPlaceholderText('Your email');

    // Action
    await act(async () => userEvent.type(emailInput, 'emailtest@gmail.com'));

    // Assert
    expect(emailInput).toHaveValue('emailtest@gmail.com');
  });

  it('should handle password typing correctly', async () => {
    // Arrange
    await act(async () => render(<LoginInput onLogin={() => {}} />));
    const passwordInput = await screen.getByPlaceholderText('Your password');

    // Action
    await act(async () => userEvent.type(passwordInput, 'passwordtest'));

    // Assert
    expect(passwordInput).toHaveValue('passwordtest');
  });

  it('should call login function when login button is clicked', async () => {
    // Arrange
    const mockLogin = jest.fn();
    await act(async () => render(<LoginInput onLogin={mockLogin} />));
    const emailInput = await screen.getByPlaceholderText('Your email');
    await act(async () => userEvent.type(emailInput, 'emailtest@gmail.com'));
    const passwordInput = await screen.getByPlaceholderText('Your password');
    await act(async () => userEvent.type(passwordInput, 'passwordtest'));
    const loginButton = await screen.getByRole('button', { selector: 'button[data-button="true"]' });

    // Action
    await act(async () => userEvent.click(loginButton));

    // Assert
    expect(mockLogin).toBeCalledWith({
      email: 'emailtest@gmail.com',
      password: 'passwordtest',
    });
  });
});
