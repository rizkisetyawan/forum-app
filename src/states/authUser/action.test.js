import * as notifications from '@mantine/notifications';
import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { api } from '../../utils';
import {
  asyncSetAuthUser,
  asyncUnsetAuthUser,
  setAuthUserActionCreator,
  unsetAuthUserActionCreator,
} from './action';

/**
 * skenario test
 *
 * - asyncSetAuthUser thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 *
 * - asyncUnsetAuthUser thunk
 *  - should dispatch action correctly when asyncUnsetAuthUser called
 *
 */

const fakeLoginRequest = {
  email: 'jhon@gmail.com',
  password: 'Jhon251@',
};

const fakeLoginResponse = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImRpbWFzMiIsIm5hbWUiOiJEaW1hcyBTYXB1dHJhIiwicGhvdG8iOiJodHRwczovL3VpLWF2YXRhcnMuY29tL2FwaS8_bmFtZT1EaW1hcyBTYXB1dHJhJmJhY2tncm91bmQ9cmFuZG9tIiwiaXNfcGVybWFuZW50IjpmYWxzZSwiaWF0IjoxNjYzODQwNzY0fQ._HrzpinFYX_m9WfvM-lGCdVrnhnaGHhzt1e6eATE1Iw';

const fakeOwnProfileResponse = {
  id: 'john_doe',
  name: 'John Doe',
  email: 'john@example.com',
  avatar: 'https://generated-image-url.jpg',
};

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncSetAuthUser thunk', () => {
  beforeEach(() => {
    // backup original implementation
    api._login = api.login;
    api._getOwnProfile = api.getOwnProfile;
    api._putAccessToken = api.putAccessToken;
  });

  afterEach(() => {
    // restore original implementation
    api.login = api._login;
    api.getOwnProfile = api._getOwnProfile;
    api.putAccessToken = api._putAccessToken;

    // delete backup
    delete api._login;
    delete api._getOwnProfile;
    delete api._putAccessToken;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    // arrange
    // stub implementation
    api.login = () => Promise.resolve(fakeLoginResponse);
    api.getOwnProfile = () => Promise.resolve(fakeOwnProfileResponse);
    // mock dispatch
    api.putAccessToken = jest.fn();
    const dispatch = jest.fn();

    // action
    await asyncSetAuthUser(fakeLoginRequest)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(api.putAccessToken).toHaveBeenCalledWith(fakeLoginResponse);
    expect(dispatch).toHaveBeenCalledWith(
      setAuthUserActionCreator(fakeOwnProfileResponse)
    );
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    // arrange
    // stub implementation
    api.login = () => Promise.reject(fakeErrorResponse);
    api.getOwnProfile = () => Promise.reject(fakeErrorResponse);

    // mock dispatch
    const dispatch = jest.fn();

    // spy on the showNotification function
    const showNotificationSpy = jest.spyOn(notifications, 'showNotification');

    // action
    await asyncSetAuthUser(fakeLoginRequest)(dispatch);

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

describe('asyncUnsetAuthUser thunk', () => {
  beforeEach(() => {
    // backup original implementation
    api._putAccessToken = api.putAccessToken;
  });

  afterEach(() => {
    // restore original implementation
    api.putAccessToken = api._putAccessToken;

    // delete backup
    delete api._putAccessToken;
  });

  it('should dispatch action correctly when asyncUnsetAuthUser called', async () => {
    // arrange
    // mock dispatch
    api.putAccessToken = jest.fn();
    const dispatch = jest.fn();

    // action
    await asyncUnsetAuthUser(fakeLoginRequest)(dispatch);

    // assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(unsetAuthUserActionCreator());
    expect(api.putAccessToken).toHaveBeenCalledWith('');
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });
});
