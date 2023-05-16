import { Box } from '@mantine/core';
import React from 'react';
import LoadingBar from 'react-redux-loading-bar';

function Loading() {
  return (
    <Box pos="sticky" top="0">
      <LoadingBar />
    </Box>
  );
}

export default Loading;
