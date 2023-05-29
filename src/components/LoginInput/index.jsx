import {
  Button, Paper, PasswordInput, TextInput
} from '@mantine/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useInput } from '../../hooks';

function LoginInput({ variantTextInput, variantButton, onLogin }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

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
  /** The variant of the TextInput */
  variantTextInput: PropTypes.oneOf(['default', 'filled', 'unstyled']),
  /** The variant of the Button Sign In */
  variantButton: PropTypes.oneOf(['filled', 'light', 'outline', 'default', 'subtle']),
  /** handle to be executed when the sign in button is clicked */
  onLogin: PropTypes.func.isRequired,
};

LoginInput.defaultProps = {
  variantButton: 'filled',
  variantTextInput: 'default'
};


export default LoginInput;
