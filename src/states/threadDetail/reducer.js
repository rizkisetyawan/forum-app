import { ActionType } from './action';

function addVote(votes, userId) {
  return votes.includes(userId)
    ? votes.filter((id) => id !== userId)
    : votes.concat(userId);
}

function removeVote(votes, userId) {
  return votes.filter((id) => id !== userId);
}

function threadDetailReducer(threadDetail = null, action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREAD_DETAIL:
      return action.payload.threadDetail;
    case ActionType.CLEAR_THREAD_DETAIL:
      return null;
    case ActionType.TOGGLE_LIKE_COMMENT:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => (comment.id === action.payload.commentId
          ? {
            ...comment,
            upVotesBy: addVote(comment.upVotesBy, action.payload.userId),
            downVotesBy: removeVote(
              comment.downVotesBy,
              action.payload.userId
            ),
          }
          : comment)),
      };
    case ActionType.TOGGLE_DISLIKE_COMMENT:
      return {
        ...threadDetail,
        comments: threadDetail.comments.map((comment) => (comment.id === action.payload.commentId
          ? {
            ...comment,
            downVotesBy: addVote(
              comment.downVotesBy,
              action.payload.userId
            ),
            upVotesBy: removeVote(comment.upVotesBy, action.payload.userId),
          }
          : comment)),
      };
    case ActionType.TOGGLE_LIKE_DETAIL:
      return {
        ...threadDetail,
        upVotesBy: addVote(threadDetail.upVotesBy, action.payload.userId),
        downVotesBy: removeVote(
          threadDetail.downVotesBy,
          action.payload.userId
        ),
      };
    case ActionType.TOGGLE_DISLIKE_DETAIL:
      return {
        ...threadDetail,
        downVotesBy: addVote(threadDetail.downVotesBy, action.payload.userId),
        upVotesBy: removeVote(threadDetail.upVotesBy, action.payload.userId),
      };
    default:
      return threadDetail;
  }
}

export default threadDetailReducer;
