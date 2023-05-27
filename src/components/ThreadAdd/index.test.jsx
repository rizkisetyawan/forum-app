import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThreadAdd from './index';

import '@testing-library/jest-dom';

/**
 * skenario testing
 *
 * - ThreadAdd component
 *   - should open modal when add thread button is clicked
 *   - should handle title typing correctly
 *   - should handle category typing correctly
 *   - should handle content typing correctly
 *   - should call onAddThread function when submit button is clicked
 */

describe('ThreadAdd component', () => {
  it('should open modal when add thread button is clicked', async () => {
    // Arrange
    await act(async () => render(<ThreadAdd onAddThread={() => {}} />));
    const openModalButton = await screen.getByTestId('open-modal-thread');

    // Action
    await act(async () => userEvent.click(openModalButton));

    // Assert
    expect(screen.getByText('Add New Thread')).toBeInTheDocument();
  });

  it('should handle title typing correctly', async () => {
    // Arrange
    await act(async () => render(<ThreadAdd onAddThread={() => {}} />));
    const openModalButton = await screen.getByTestId('open-modal-thread');
    await act(async () => userEvent.click(openModalButton));
    const titleInput = await screen.getByPlaceholderText('title');

    // Action
    await act(async () => userEvent.type(titleInput, 'titletesting'));

    // Assert
    expect(titleInput).toHaveValue('titletesting');
  });

  it('should handle category typing correctly', async () => {
    // Arrange
    await act(async () => render(<ThreadAdd onAddThread={() => {}} />));
    const openModalButton = await screen.getByTestId('open-modal-thread');
    await act(async () => userEvent.click(openModalButton));
    const categoryInput = await screen.getByPlaceholderText('category');

    // Action
    await act(async () => userEvent.type(categoryInput, 'categorytesting'));

    // Assert
    expect(categoryInput).toHaveValue('categorytesting');
  });

  it('should handle content typing correctly', async () => {
    // Arrange
    await act(async () => render(<ThreadAdd onAddThread={() => {}} />));
    const openModalButton = await screen.getByTestId('open-modal-thread');
    await act(async () => userEvent.click(openModalButton));
    const contentInput = await screen.getByPlaceholderText('content');

    // Action
    await act(async () => userEvent.type(contentInput, 'contenttesting'));

    // Assert
    expect(contentInput).toHaveValue('contenttesting');
  });

  it('should call onAddThread function when submit button is clicked', async () => {
    // Arrange
    const mockAddThread = jest.fn();
    await act(async () => render(<ThreadAdd onAddThread={mockAddThread} />));
    const openModalButton = await screen.getByTestId('open-modal-thread');
    await act(async () => userEvent.click(openModalButton));
    const titleInput = await screen.getByPlaceholderText('title');
    await act(async () => userEvent.type(titleInput, 'titletesting'));
    const categoryInput = await screen.getByPlaceholderText('category');
    await act(async () => userEvent.type(categoryInput, 'categorytesting'));
    const contentInput = await screen.getByPlaceholderText('content');
    await act(async () => userEvent.type(contentInput, 'contenttesting'));
    const addThreadButton = await screen.getByTestId('add-new-thread');

    // Action
    await act(async () => userEvent.click(addThreadButton));

    // Assert
    expect(mockAddThread).toBeCalledWith({
      title: 'titletesting',
      category: 'categorytesting',
      body: 'contenttesting',
    });
  });
});
