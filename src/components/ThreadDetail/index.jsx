/* eslint-disable react/no-danger */
import {
  ActionIcon,
  Anchor,
  Avatar,
  Badge,
  Box,
  Divider,
  Flex,
  Group,
  Text,
  Title,
  TypographyStylesProvider,
} from '@mantine/core';
import { IconThumbDown, IconThumbUp } from '@tabler/icons-react';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ThreadComments from '../ThreadComments';
import ThreadCommentInput from '../ThreadCommentInput';

function ThreadDetail({
  id,
  title,
  body,
  category,
  upVotesBy,
  downVotesBy,
  createdAt,
  owner,
  authUser,
  comments,
  onLike,
  onDislike,
  onAddComment
}) {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const actions = [
    {
      actionTitle: 'like',
      icon: IconThumbUp,
      count: upVotesBy?.length,
      isClicked: upVotesBy.includes(authUser),
      handleClick: () => onLike(id),
    },
    {
      actionTitle: 'dislike',
      icon: IconThumbDown,
      count: downVotesBy?.length,
      isClicked: downVotesBy.includes(authUser),
      handleClick: () => onDislike(id),
    },
  ];

  return (
    <Box mb={16}>
      <Flex align="center" gap={12} mb={8}>
        <Avatar src={owner.avatar} size="md" color="cyan" radius="xl" />
        <Box>
          <Text>{owner.name}</Text>
          <Text fz="sm" c="dimmed">
            {moment(createdAt).fromNow()}
          </Text>
        </Box>
        <Badge
          radius="sm"
          variant="outline"
          mb={8}
          sx={{ textTransform: 'lowercase' }}
        >
          {`#${category}`}
        </Badge>
      </Flex>
      <Box mb={16}>
        <Title fz={21} order={3} mb={8}>
          {title}
        </Title>
        <Text>
          <TypographyStylesProvider>
            <div dangerouslySetInnerHTML={{ __html: body }} />
          </TypographyStylesProvider>
        </Text>
      </Box>
      <Group my={16} spacing="xl">
        {actions.map(
          ({
            icon: Icon, actionTitle, count, isClicked, handleClick
          }) => (
            <Flex align="center" gap={4} key={actionTitle}>
              <ActionIcon
                color={isClicked ? 'blue' : 'gray'}
                radius="xl"
                onClick={handleClick}
              >
                <Icon size={20} />
              </ActionIcon>
              <Text c="dimmed" fz="sm">
                {count}
              </Text>
            </Flex>
          )
        )}
      </Group>
      <Box mb={24}>
        <Title fz={18} order={3} mb={8}>
          Add Comments
        </Title>
        { authUser ? (
          <ThreadCommentInput onAddComment={onAddComment} />
        ) : (
          <Group spacing="xs">
            <Anchor component="button" type="button" weight={800} onClick={handleLogin}>Login</Anchor>
            <Text>to comment</Text>
          </Group>
        )}
      </Box>
      <ThreadComments authUser={authUser} comments={comments} />
      <Divider size="xs" />
    </Box>
  );
}

const owner = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const threadDetailShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(owner).isRequired,
  authUser: PropTypes.string.isRequired,
};

ThreadDetail.propTypes = {
  ...threadDetailShape,
  onLike: PropTypes.func.isRequired,
  onDislike: PropTypes.func.isRequired,
  onAddComment: PropTypes.func.isRequired,
};

export default ThreadDetail;
