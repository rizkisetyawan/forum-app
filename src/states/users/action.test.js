import * as notifications from '@mantine/notifications';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { api } from '../../utils';
import { asyncRegisterUser } from './action';

/**
 * skenario test
 *
 * - asyncRegisterUser thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 */

const fakeRequestRegisterUser = {
  name: 'Jhon Doe',
  email: 'john@example.com',
  password: 'Jhon531!',
};

const fakeSuccessResponse = {
  id: 'user-123',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://generated-image-url.jpg',
};

const fakeSuccessMessageResponse = 'succesfully create account';

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncRegisterUser thunk', () => {
  beforeEach(() => {
    // backup original implementation
    api._register = api.register;
  });

  afterEach(() => {
    // restore original implementation
    api.register = api._register;

    // delete backup
    delete api._register;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    api.register = () => Promise.resolve(fakeSuccessResponse);
    // mock implementation
    const dispatch = jest.fn();

    // spy on the showNotification function
    const showNotificationSpy = jest.spyOn(notifications, 'showNotification');

    // action
    await asyncRegisterUser(fakeRequestRegisterUser)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(showNotificationSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        color: 'green',
        message: fakeSuccessMessageResponse,
      })
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    // stub implementation
    api.register = () => Promise.reject(fakeErrorResponse);
    // mock implementation
    const dispatch = jest.fn();

    // spy on the showNotification function
    const showNotificationSpy = jest.spyOn(notifications, 'showNotification');

    // action
    await asyncRegisterUser(fakeRequestRegisterUser)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(showNotificationSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        color: 'red',
        message: fakeErrorResponse.message,
      })
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
