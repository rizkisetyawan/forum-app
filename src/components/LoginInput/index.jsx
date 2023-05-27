import {
  Button, Paper, PasswordInput, TextInput
} from '@mantine/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useInput } from '../../hooks';

function LoginInput({ variantTextInput, variantButton, onLogin }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const handleSignIn = () => {
    onLogin({ email, password });
  };

  return (
    <Paper maw={380} withBorder shadow="md" p={30} mt={30} radius="md">
      <TextInput
        label="Email"
        placeholder="Your email"
        value={email}
        onChange={onEmailChange}
        variant={variantTextInput}
        required
      />
      <PasswordInput
        label="Password"
        placeholder="Your password"
        value={password}
        onChange={onPasswordChange}
        variant={variantTextInput}
        required
        mt="md"
      />
      <Button fullWidth mt="xl" variant={variantButton} onClick={handleSignIn}>
        Sign in
      </Button>
    </Paper>
  );
}

LoginInput.propTypes = {
  /** The title of the announcement */
  variantTextInput: PropTypes.oneOf(['default', 'filled', 'unstyled']),
  /** The title of the announcement */
  variantButton: PropTypes.oneOf(['filled', 'light', 'outline', 'default', 'subtle']),
  /** The title of the announcement */
  onLogin: PropTypes.func.isRequired,
};

LoginInput.defaultProps = {
  variantButton: 'filled',
  variantTextInput: 'default'
};


export default LoginInput;
