import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { api, showError } from '../../utils';

const ActionType = {
  RECEIVE_LEADERBOARDS: 'RECEIVE_LEADERBOARDS',
};

function receiveLeaderboardsActionCreator(leaderboards) {
  return {
    type: ActionType.RECEIVE_LEADERBOARDS,
    payload: {
      leaderboards,
    },
  };
}

function asyncReceiveLeaderboards() {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const leaderboards = await api.getAllLeaderboards();
      dispatch(receiveLeaderboardsActionCreator(leaderboards));
    } catch (error) {
      showError(error.message);
    }
    dispatch(hideLoading());
  };
}

export { ActionType, asyncReceiveLeaderboards };
