import {
  Button, Paper, PasswordInput, TextInput
} from '@mantine/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useInput } from '../../hooks';

function RegisterInput({ onRegister, variantTextInput, variantButton }) {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  const handleSubmit = () => {
    onRegister({ name, email, password });
  };

  return (
    <Paper withBorder maw={380} shadow="md" p={30} mt={30} radius="md">
      <TextInput
        label="Name"
        placeholder="Your Name"
        value={name}
        onChange={onNameChange}
        variant={variantTextInput}
        required
      />
      <TextInput
        label="Email"
        placeholder="Your Email"
        value={email}
        onChange={onEmailChange}
        variant={variantTextInput}
        required
        mt="md"
      />
      <PasswordInput
        label="Password"
        placeholder="Your Password"
        value={password}
        onChange={onPasswordChange}
        variant={variantTextInput}
        required
        mt="md"
      />
      <Button variant={variantButton} fullWidth mt="xl" onClick={handleSubmit}>
        Register
      </Button>
    </Paper>
  );
}

RegisterInput.propTypes = {
  variantTextInput: PropTypes.oneOf(['default', 'filled', 'unstyled']),
  variantButton: PropTypes.oneOf(['filled', 'light', 'outline', 'default', 'subtle']),
  onRegister: PropTypes.func.isRequired,
};

RegisterInput.defaultProps = {
  variantButton: 'filled',
  variantTextInput: 'default'
};

export default RegisterInput;
