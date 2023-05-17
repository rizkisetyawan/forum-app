/* eslint-disable no-unused-vars */
import { Container } from '@mantine/core';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  asyncToogleLikeThread,
  asyncToogleDislikeThread,
} from '../../states/threads/action';
import { asyncReceiveThreadDetail } from '../../states/threadDetail/action';
import { ThreadDetail } from '../../components';

function Thread() {
  const { id } = useParams();
  const {
    threadDetail = null,
    authUser,
  } = useSelector((states) => states);
  const dispatch = useDispatch();

  const handleLike = (threadId) => {
    dispatch(asyncToogleLikeThread(threadId));
  };

  const handleDislike = (threadId) => {
    dispatch(asyncToogleDislikeThread(threadId));
  };

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  if (!threadDetail) {
    return null;
  }

  return (
    <Container p={32}>
      <ThreadDetail
        {...threadDetail}
        onLike={handleLike}
        onDislike={handleDislike}
        authUser={authUser?.id}
      />
    </Container>
  );
}

export default Thread;
