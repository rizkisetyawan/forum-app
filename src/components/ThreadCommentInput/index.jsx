import { Button, Flex, Textarea } from '@mantine/core';
import React, { useState } from 'react';

function ThreadCommentInput() {
  const [text, setText] = useState('');

  const handleSend = () => {
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
        minRows={2}
        value={text}
        sx={{ flex: 1 }}
        onChange={handleTextChange}
      />
      <Button onClick={handleSend}>Kirim</Button>
    </Flex>
  );
}

export default ThreadCommentInput;
