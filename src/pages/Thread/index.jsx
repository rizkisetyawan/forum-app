/* eslint-disable no-unused-vars */
import { Container } from '@mantine/core';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import {
  asyncAddComment,
  asyncReceiveThreadDetail,
  asyncToogleLikeDetail,
  asyncToogleDislikeDetail,
} from '../../states/threadDetail/action';
import { ThreadDetail } from '../../components';

function Thread() {
  const { id } = useParams();
  const { threadDetail = null, authUser } = useSelector((states) => states);
  const dispatch = useDispatch();

  const handleLike = (threadId) => {
    dispatch(asyncToogleLikeDetail(threadId));
  };

  const handleDislike = (threadId) => {
    dispatch(asyncToogleDislikeDetail(threadId));
  };

  const handleAddComment = (content) => {
    dispatch(asyncAddComment(content));
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
        onAddComment={handleAddComment}
        onLike={handleLike}
        onDislike={handleDislike}
        authUser={authUser?.id}
      />
    </Container>
  );
}

export default Thread;
