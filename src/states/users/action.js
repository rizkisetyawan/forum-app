import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { api, showError, showInfo } from '../../utils';

const ActionType = {
  RECEIVE_USERS: 'RECEIVE_USERS',
};

function receiveUsersActionCreator(users) {
  return {
    type: ActionType.RECEIVE_USERS,
    payload: {
      users,
    },
  };
}

function asyncRegisterUser(data) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      await api.register(data);
      showInfo('succesfully create account');
    } catch (error) {
      showError(error.message);
    }
    dispatch(hideLoading());
  };
}

export { ActionType, receiveUsersActionCreator, asyncRegisterUser };
