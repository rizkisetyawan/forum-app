import { Title } from '@mantine/core';
import PropTypes from 'prop-types';
import React from 'react';
import ThreadItem, { threadItemShape } from '../ThreadItem';

function ThreadsList({ threads, onLike, onDislike }) {
  return (
    <>
      <Title order={2} my={32}>
        Diskusi Tersedia
      </Title>
      {threads.map((thread) => (
        <ThreadItem
          key={thread.id}
          onLike={onLike}
          onDislike={onDislike}
          {...thread}
        />
      ))}
    </>
  );
}

ThreadsList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape(threadItemShape)).isRequired,
  onLike: PropTypes.func.isRequired,
  onDislike: PropTypes.func.isRequired,
};

export default ThreadsList;
