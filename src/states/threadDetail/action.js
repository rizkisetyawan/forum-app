import { hideLoading, showLoading } from 'react-redux-loading-bar';
import { api, showError } from '../../utils';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  TOGGLE_LIKE_COMMENT: 'TOGGLE_LIKE_COMMENT',
  TOGGLE_DISLIKE_COMMENT: 'TOGGLE_DISLIKE_COMMENT',
};

function receiveThreadDetailActionCreator(threadDetail) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: {
      threadDetail,
    },
  };
}

function clearThreadDetailActionCreator() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}

function toggleLikeCommentActionCreator(commentId, userId) {
  return {
    type: ActionType.TOGGLE_LIKE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function toggleDislikeCommentActionCreator(commentId, userId) {
  return {
    type: ActionType.TOGGLE_DISLIKE_COMMENT,
    payload: {
      commentId,
      userId,
    },
  };
}

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());
    try {
      const threadDetail = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetailActionCreator(threadDetail));
    } catch (error) {
      showError(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncToogleLikeComment(commentId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser, threadDetail } = getState();
    dispatch(toggleLikeCommentActionCreator(commentId, authUser.id));

    try {
      await api.upVoteComment(threadDetail.id, commentId);
    } catch (error) {
      showError(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncToogleDislikeComment(commentId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());
    const { authUser, threadDetail } = getState();
    dispatch(toggleDislikeCommentActionCreator(commentId, authUser.id));

    try {
      await api.downVoteComment(threadDetail.id, commentId);
    } catch (error) {
      showError(error.message);
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  asyncReceiveThreadDetail,
  asyncToogleLikeComment,
  asyncToogleDislikeComment,
};
