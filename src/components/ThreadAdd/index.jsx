import React from 'react';
import PropTypes from 'prop-types';
import {
  ActionIcon,
  Button,
  Modal,
  Stack,
  Text,
  TextInput,
  Textarea,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import { useInput } from '../../hooks';

function ThreadAdd({ onAddThread }) {
  const [opened, { open, close }] = useDisclosure(false);
  const [title, onTitleChange, setTitle] = useInput('');
  const [category, onCategoryChange, setCategory] = useInput('');
  const [content, onContentChange, setContent] = useInput('', 'textarea');

  const handleSubmit = () => {
    onAddThread({ title, category, body: content });
    setTitle('');
    setCategory('');
    setContent('');
    close();
  };

  return (
    <>
      <Modal opened={opened} onClose={close} title={<Text fz={18} fw={800} c="blue.8" mb={8}>Add New Thread</Text>}>
        <Stack spacing="xs" m={16}>
          <TextInput value={title} onChange={onTitleChange} placeholder="title" label="Title" />
          <TextInput
            value={category}
            placeholder="category"
            onChange={onCategoryChange}
          />
          <Textarea
            value={content}
            onChange={onContentChange}
            placeholder="content"
            label="Content"
            autosize
            minRows={3}
          />
          <Button data-testid="add-new-thread" size="sm" mt={8} onClick={handleSubmit}>
            Submit
          </Button>
        </Stack>
      </Modal>
      <ActionIcon
        data-testid="open-modal-thread"
        color="blue"
        size="xl"
        radius="xl"
        variant="filled"
        pos="fixed"
        bottom={32}
        right={32}
        onClick={open}
      >
        <IconPlus size={24} />
      </ActionIcon>
    </>
  );
}

ThreadAdd.propTypes = {
  onAddThread: PropTypes.func.isRequired,
};

export default ThreadAdd;
