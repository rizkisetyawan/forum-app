import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RegisterInput from './index';

import '@testing-library/jest-dom';

/**
 * skenario testing
 *
 * - RegisterInput component
 *   - should handle name typing correctly
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call register function when register button is clicked
 */

describe('RegisterInput component', () => {
  it('should handle name typing correctly', async () => {
    // Arrange
    await act(async () => render(<RegisterInput onRegister={() => {}} />));
    const nameInput = await screen.getByPlaceholderText('Your Name');

    // Action
    await act(async () => userEvent.type(nameInput, 'testName'));

    // Assert
    expect(nameInput).toHaveValue('testName');
  });

  it('should handle email typing correctly', async () => {
    // Arrange
    await act(async () => render(<RegisterInput onRegister={() => {}} />));
    const emailInput = await screen.getByPlaceholderText('Your Email');

    // Action
    await act(async () => userEvent.type(emailInput, 'emailtest@gmail.com'));

    // Assert
    expect(emailInput).toHaveValue('emailtest@gmail.com');
  });

  it('should handle password typing correctly', async () => {
    // Arrange
    await act(async () => render(<RegisterInput onRegister={() => {}} />));
    const passwordInput = await screen.getByPlaceholderText('Your Password');

    // Action
    await act(async () => userEvent.type(passwordInput, 'passwordtest'));

    // Assert
    expect(passwordInput).toHaveValue('passwordtest');
  });

  it('should call register function when register button is clicked', async () => {
    // Arrange
    const mockRegister = jest.fn();
    await act(async () => render(<RegisterInput onRegister={mockRegister} />));
    const nameInput = await screen.getByPlaceholderText('Your Name');
    await act(async () => userEvent.type(nameInput, 'testName'));
    const emailInput = await screen.getByPlaceholderText('Your Email');
    await act(async () => userEvent.type(emailInput, 'emailtest@gmail.com'));
    const passwordInput = await screen.getByPlaceholderText('Your Password');
    await act(async () => userEvent.type(passwordInput, 'passwordtest'));
    const registerButton = await screen.getByRole('button', {
      selector: 'button[data-button="true"]'
    });

    // Action
    await act(async () => userEvent.click(registerButton));

    // Assert
    expect(mockRegister).toBeCalledWith({
      name: 'testName',
      email: 'emailtest@gmail.com',
      password: 'passwordtest'
    });
  });
});
