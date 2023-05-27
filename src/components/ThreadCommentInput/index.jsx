import { Button, Flex, Textarea } from '@mantine/core';
import React, { useState } from 'react';
import PropTypes from 'prop-types';

function ThreadCommentInput({ onAddComment }) {
  const [text, setText] = useState('');

  const handleSend = () => {
    onAddComment(text);
    if (text.trim()) {
      setText('');
    }
  };

  const handleTextChange = ({ currentTarget }) => {
    if (currentTarget.value.length <= 320) {
      setText(currentTarget.value);
    }
  };

  return (
    <Flex gap={16}>
      <Textarea
        autosize
        placeholder="your comment"
        minRows={3}
        value={text}
        sx={{ flex: 1 }}
        onChange={handleTextChange}
      />
      <Button onClick={handleSend} data-testid="add-new-comment">Send</Button>
    </Flex>
  );
}

ThreadCommentInput.propTypes = {
  onAddComment: PropTypes.func.isRequired,
};

export default ThreadCommentInput;
