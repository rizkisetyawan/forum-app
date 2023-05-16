const api = (() => {
  const BASE_URL = 'https://forum-api.dicoding.dev/v1';

  function getAccessToken() {
    return localStorage.getItem('accessToken');
  }

  function putAccessToken(token) {
    localStorage.setItem('accessToken', token);
  }

  async function _fetchWithAuth(url, options = {}) {
    return fetch(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${getAccessToken()}`,
      },
    });
  }

  function _handleResponse(responseJson) {
    const { status, message, data } = responseJson;
    if (status !== 'success') {
      throw new Error(message);
    }
    return data;
  }

  async function register({ name, email, password }) {
    const response = await fetch(`${BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });

    const responseJson = await response.json();
    const { user } = _handleResponse(responseJson);
    return user;
  }

  async function login({ email, password }) {
    const response = await fetch(`${BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const responseJson = await response.json();
    const { token } = _handleResponse(responseJson);
    return token;
  }

  async function getOwnProfile() {
    const response = await _fetchWithAuth(`${BASE_URL}/users/me`);
    const responseJson = await response.json();
    const { user } = _handleResponse(responseJson);
    return user;
  }

  async function getAllUsers() {
    const response = await fetch(`${BASE_URL}/users`);
    const responseJson = await response.json();
    const { users } = _handleResponse(responseJson);
    return users;
  }

  async function getAllThreads() {
    const response = await fetch(`${BASE_URL}/threads`);
    const responseJson = await response.json();
    const { threads } = _handleResponse(responseJson);
    return threads;
  }

  async function getThreadDetail(id) {
    const response = await fetch(`${BASE_URL}/threads/${id}`);
    const responseJson = await response.json();
    const { detailThread } = _handleResponse(responseJson);
    return detailThread;
  }

  async function createThread({ title, body, category }) {
    const response = await _fetchWithAuth(`${BASE_URL}/threads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title,
        body,
        category,
      }),
    });

    const responseJson = await response.json();
    const { thread } = _handleResponse(responseJson);
    return thread;
  }

  async function createComment({ id, content }) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${id}/comments`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
        }),
      }
    );

    const responseJson = await response.json();
    const { comment } = _handleResponse(responseJson);
    return comment;
  }

  async function voteThread(url) {
    const response = await _fetchWithAuth(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const responseJson = await response.json();
    const { vote } = _handleResponse(responseJson);
    return vote;
  }

  async function upVoteThread(id) {
    return voteThread(`${BASE_URL}/threads/${id}/up-vote`);
  }

  async function downVoteThread(id) {
    return voteThread(`${BASE_URL}/threads/${id}/down-vote`);
  }

  async function neutralVoteThread(id) {
    return voteThread(`${BASE_URL}/threads/${id}/neutral-vote`);
  }

  async function voteComment(threadId, commentId, voteType) {
    const response = await _fetchWithAuth(
      `${BASE_URL}/threads/${threadId}/comments/${commentId}/${voteType}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const responseJson = await response.json();
    const { vote } = _handleResponse(responseJson);
    return vote;
  }

  async function upVoteComment(threadId, commentId) {
    return voteComment(threadId, commentId, 'up-vote');
  }

  async function downVoteComment(threadId, commentId) {
    return voteComment(threadId, commentId, 'down-vote');
  }

  async function neutralVoteComment(threadId, commentId) {
    return voteComment(threadId, commentId, 'neutral-vote');
  }

  async function getAllLeaderboards() {
    const response = await fetch(`${BASE_URL}/leaderboards`);
    const responseJson = await response.json();
    const { leaderboards } = _handleResponse(responseJson);
    return leaderboards;
  }

  return {
    putAccessToken,
    getAccessToken,
    register,
    login,
    getOwnProfile,
    getAllUsers,
    getAllThreads,
    getThreadDetail,
    createThread,
    createComment,
    upVoteThread,
    downVoteThread,
    neutralVoteThread,
    upVoteComment,
    downVoteComment,
    neutralVoteComment,
    getAllLeaderboards,
  };
})();

export default api;
