/* eslint-disable react/no-danger */
import {
  ActionIcon,
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
import { IconMessage2, IconThumbDown, IconThumbUp } from '@tabler/icons-react';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';

function ThreadItem({
  id,
  title,
  body,
  category,
  upVotesBy,
  downVotesBy,
  totalComments,
  createdAt,
  user,
  authUser,
  onLike,
  onDislike,
}) {
  const actions = [
    {
      actionTitle: 'like',
      icon: IconThumbUp,
      count: upVotesBy.length,
      isClicked: upVotesBy.includes(authUser),
      handleClick: () => onLike(id),
    },
    {
      actionTitle: 'dislike',
      icon: IconThumbDown,
      count: downVotesBy.length,
      isClicked: downVotesBy.includes(authUser),
      handleClick: () => onDislike(id),
    },
    {
      actionTitle: 'comment',
      icon: IconMessage2,
      count: totalComments,
      isClicked: false,
      handleClick: () => {},
    },
  ];

  return (
    <Box mb={16}>
      <Flex align="center" gap={12} mb={8}>
        <Avatar src={user.avatar} size="md" color="cyan" radius="xl" />
        <Box>
          <Text>{user.name}</Text>
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
      <Title fz={18} order={3} mb={8}>
        {title}
      </Title>
      <Text lineClamp={4}>
        <TypographyStylesProvider>
          <div dangerouslySetInnerHTML={{ __html: body }} />
        </TypographyStylesProvider>
      </Text>
      <Group my={16} spacing="xl">
        {actions.map(
          ({
            icon: Icon, actionTitle, count, isClicked, handleClick
          }) => (
            <Flex align="center" gap={4} key={actionTitle}>
              <ActionIcon color={isClicked ? 'blue' : 'gray'} radius="xl" onClick={handleClick}>
                <Icon size={20} />
              </ActionIcon>
              <Text c="dimmed" fz="sm">
                {count}
              </Text>
            </Flex>
          )
        )}
      </Group>
      <Divider size="xs" />
    </Box>
  );
}

const userShape = {
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const threadItemShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  totalComments: PropTypes.number.isRequired,
  createdAt: PropTypes.string.isRequired,
  user: PropTypes.shape(userShape).isRequired,
  authUser: PropTypes.string.isRequired,
};

ThreadItem.propTypes = {
  ...threadItemShape,
  onLike: PropTypes.func,
  onDislike: PropTypes.func,
};

ThreadItem.defaultProps = {
  onLike: null,
  onDislike: null,
};

export { threadItemShape };

export default ThreadItem;
