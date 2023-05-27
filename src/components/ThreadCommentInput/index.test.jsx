import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ThreadCommentInput from './index';

import '@testing-library/jest-dom';

/**
 * skenario testing
 *
 * - ThreadCommentInput component
 *   - should handle comment typing correctly
 *   - should call onAddComment function when send button is clicked
 */

describe('ThreadCommentInput component', () => {
  it('should handle title typing correctly', async () => {
    // Arrange
    await act(async () => render(<ThreadCommentInput onAddComment={() => {}} />));
    const commentInput = await screen.getByPlaceholderText('your comment');

    // Action
    await act(async () => userEvent.type(commentInput, 'test comment'));

    // Assert
    expect(commentInput).toHaveValue('test comment');
  });

  it('should call onAddComment function when Send button is clicked', async () => {
    // Arrange
    const mockAddComment = jest.fn();
    await act(async () => render(<ThreadCommentInput onAddComment={mockAddComment} />));
    const commentInput = await screen.getByPlaceholderText('your comment');
    await act(async () => userEvent.type(commentInput, 'test comment'));
    const addCommentButton = await screen.getByTestId('add-new-comment');

    // Action
    await act(async () => userEvent.click(addCommentButton));

    // Assert
    expect(mockAddComment).toBeCalledWith('test comment');
  });
});
