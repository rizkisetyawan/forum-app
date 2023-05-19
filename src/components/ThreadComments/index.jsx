/* eslint-disable react/no-danger */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import {
  ActionIcon,
  Avatar,
  Box,
  Flex,
  Group,
  Text,
  Title,
  TypographyStylesProvider,
} from '@mantine/core';
import { IconThumbDown, IconThumbUp } from '@tabler/icons-react';
import { useDispatch } from 'react-redux';
import {
  asyncToogleDislikeComment,
  asyncToogleLikeComment,
} from '../../states/threadDetail/action';

function ThreadComments({ authUser, comments }) {
  const dispatch = useDispatch();

  const handleLike = React.useCallback(
    (id) => {
      dispatch(asyncToogleLikeComment(id));
    },
    [dispatch]
  );

  const handleDislike = React.useCallback(
    (id) => {
      dispatch(asyncToogleDislikeComment(id));
    },
    [dispatch]
  );

  return (
    <Box mb={24}>
      <Title fz={18} order={3} mb={16}>
        {comments.length}
        {' '}
        Comments
      </Title>
      {comments.map((comment) => (
        <Flex key={comment.id} gap={12} mb={16}>
          <Avatar
            src={comment.owner.avatar}
            size="md"
            color="cyan"
            radius="xl"
          />
          <Box>
            <Group>
              <Text fz={14} fw={700}>
                {comment.owner.name}
              </Text>
              <Text fz="sm" c="dimmed">
                {moment(comment.createdAt).fromNow()}
              </Text>
            </Group>
            <Text>
              <TypographyStylesProvider>
                <div dangerouslySetInnerHTML={{ __html: comment.content }} />
              </TypographyStylesProvider>
            </Text>
            <Group my={8} spacing="xl">
              <Flex align="center" gap={4}>
                <ActionIcon
                  color={comment.upVotesBy.includes(authUser) ? 'blue' : 'gray'}
                  radius="xl"
                  onClick={() => handleLike(comment.id)}
                >
                  <IconThumbUp size={20} />
                </ActionIcon>
                <Text c="dimmed" fz="sm">
                  {comment.upVotesBy.length}
                </Text>
              </Flex>
              <Flex align="center" gap={4}>
                <ActionIcon
                  color={
                    comment.downVotesBy.includes(authUser) ? 'blue' : 'gray'
                  }
                  radius="xl"
                  onClick={() => handleDislike(comment.id)}
                >
                  <IconThumbDown size={20} />
                </ActionIcon>
                <Text c="dimmed" fz="sm">
                  {comment.downVotesBy.length}
                </Text>
              </Flex>
            </Group>
          </Box>
        </Flex>
      ))}
    </Box>
  );
}

const commentsShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  owner: PropTypes.shape({
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  createdAt: PropTypes.instanceOf(Date).isRequired,
  content: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
});

ThreadComments.propTypes = {
  authUser: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(commentsShape).isRequired,
};

export default React.memo(ThreadComments);
