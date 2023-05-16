import { ActionType } from './action';

function toggleVote(votes, userId) {
  return votes.includes(userId)
    ? votes.filter((id) => id !== userId)
    : votes.concat(userId);
}

function removeVote(votes, userId) {
  return votes.filter((id) => id !== userId);
}

function threadsReducer(threads = [], action = {}) {
  switch (action.type) {
    case ActionType.RECEIVE_THREADS:
      return action.payload.threads;
    case ActionType.ADD_THREAD:
      return [action.payload.thread, ...threads];
    case ActionType.TOGGLE_LIKE_THREAD:
      return threads.map((thread) => (thread.id === action.payload.threadId
        ? {
          ...thread,
          upVotesBy: toggleVote(thread.upVotesBy, action.payload.userId),
          downVotesBy: removeVote(
            thread.downVotesBy,
            action.payload.userId
          ),
        }
        : thread));
    case ActionType.TOGGLE_DISLIKE_THREAD:
      return threads.map((thread) => (thread.id === action.payload.threadId
        ? {
          ...thread,
          downVotesBy: toggleVote(
            thread.downVotesBy,
            action.payload.userId
          ),
          upVotesBy: removeVote(thread.upVotesBy, action.payload.userId),
        }
        : thread));
    default:
      return threads;
  }
}

export default threadsReducer;
