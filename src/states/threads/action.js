import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { api, showError } from '../../utils';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  TOGGLE_LIKE_THREAD: 'TOGGLE_LIKE_THREAD',
  TOGGLE_DISLIKE_THREAD: 'TOGGLE_DISLIKE_THREAD',
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
    },
  };
}

function toggleLikeThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_LIKE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function toggleDislikeThreadActionCreator({ threadId, userId }) {
  return {
    type: ActionType.TOGGLE_DISLIKE_THREAD,
    payload: {
      threadId,
      userId,
    },
  };
}

function asyncAddThread({ title, body, category }) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));
    } catch (error) {
      showError(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncToogleLikeThread(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser } = getState();
    dispatch(toggleLikeThreadActionCreator({ threadId, userId: authUser?.id }));

    try {
      await api.upVoteThread(threadId);
    } catch (error) {
      showError(error.message);
      dispatch(
        toggleLikeThreadActionCreator({ threadId, userId: authUser?.id })
      );
    }
    dispatch(hideLoading());
  };
}

function asyncToogleDislikeThread(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser } = getState();
    dispatch(
      toggleDislikeThreadActionCreator({ threadId, userId: authUser?.id })
    );

    try {
      await api.downVoteThread(threadId);
    } catch (error) {
      showError(error.message);
      dispatch(
        toggleDislikeThreadActionCreator({ threadId, userId: authUser?.id })
      );
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  toggleLikeThreadActionCreator,
  toggleDislikeThreadActionCreator,
  asyncAddThread,
  asyncToogleLikeThread,
  asyncToogleDislikeThread,
};
