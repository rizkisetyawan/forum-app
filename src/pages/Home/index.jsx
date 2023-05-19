import { Container } from '@mantine/core';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThreadAdd, ThreadsList } from '../../components';
import { asyncPopulateUsersAndThreads } from '../../states/shared/action';
import {
  asyncAddThread,
  asyncToogleLikeThread,
  asyncToogleDislikeThread,
} from '../../states/threads/action';

function Home() {
  const {
    threads = [],
    users = [],
    authUser,
  } = useSelector((states) => states);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const handleLike = (id) => {
    dispatch(asyncToogleLikeThread(id));
  };

  const handleDislike = (id) => {
    dispatch(asyncToogleDislikeThread(id));
  };

  const handleAddThread = (data) => {
    dispatch(asyncAddThread(data));
  };

  const threadList = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
    authUser: authUser?.id,
  }));

  return (
    <Container px={32}>
      <ThreadsList
        threads={threadList}
        onLike={handleLike}
        onDislike={handleDislike}
      />
      {authUser && <ThreadAdd onAddThread={handleAddThread} />}
    </Container>
  );
}

export default Home;
