import { Select, Text, Title } from '@mantine/core';
import { IconHash } from '@tabler/icons-react';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import ThreadItem, { threadItemShape } from '../ThreadItem';

function ThreadsList({
  threads, onLike, onDislike, categories
}) {
  const [value, setValue] = useState(null);

  const filterThreads = threads.filter((thread) => thread.category === value);

  return (
    <>
      <Title order={2} mt={32} mb={16} align="center">
        Threads Available
      </Title>
      <Select
        clearable
        searchable
        label={<Text fz={18} fw={800} c="blue.8" mb={8}>Categories</Text>}
        placeholder="All categories"
        nothingFound="No category"
        icon={<IconHash size={18} />}
        data={categories}
        value={value}
        onChange={setValue}
        mb={32}
      />
      {(value ? filterThreads : threads).map((thread) => (
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
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  threads: PropTypes.arrayOf(PropTypes.shape(threadItemShape)).isRequired,
  onLike: PropTypes.func.isRequired,
  onDislike: PropTypes.func.isRequired,
};

export default ThreadsList;
