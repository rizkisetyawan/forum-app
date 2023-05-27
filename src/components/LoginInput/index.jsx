import {
  Button, Paper, PasswordInput, TextInput
} from '@mantine/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useInput } from '../../hooks';

function LoginInput({ onLogin }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const handleSignIn = () => {
    onLogin({ email, password });
  };

  return (
    <Paper withBorder shadow="md" p={30} mt={30} radius="md">
      <TextInput
        label="Email"
        placeholder="Your email"
        value={email}
        onChange={onEmailChange}
        required
      />
      <PasswordInput
        label="Password"
        placeholder="Your password"
        value={password}
        onChange={onPasswordChange}
        required
        mt="md"
      />
      <Button fullWidth mt="xl" onClick={handleSignIn}>
        Sign in
      </Button>
    </Paper>
  );
}

LoginInput.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default LoginInput;
