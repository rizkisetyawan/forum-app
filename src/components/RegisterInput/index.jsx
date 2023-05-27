import {
  Button, Paper, PasswordInput, TextInput
} from '@mantine/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useInput } from '../../hooks';

function RegisterInput({ onRegister }) {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const handleSubmit = () => {
    onRegister({ name, email, password });
  };

  return (
    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
      <TextInput
        label="Name"
        placeholder="Your Name"
        value={name}
        onChange={onNameChange}
        required
      />
      <TextInput
        label="Email"
        placeholder="Your Email"
        value={email}
        onChange={onEmailChange}
        required
        mt="md"
      />
      <PasswordInput
        label="Password"
        placeholder="Your Password"
        value={password}
        onChange={onPasswordChange}
        required
        mt="md"
      />
      <Button fullWidth mt="xl" onClick={handleSubmit}>
        Register
      </Button>
    </Paper>
  );
}

RegisterInput.propTypes = {
  onRegister: PropTypes.func.isRequired
};

export default RegisterInput;
