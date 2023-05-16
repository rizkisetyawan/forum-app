import {
  Anchor,
  Button,
  Container,
  Paper,
  PasswordInput,
  Space,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useInput } from '../../hooks';

function Register() {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <Container size={380} my={40} pt={80}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900,
        })}
      >
        Forum App
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Already have an account ?
        <Space w="sm" />
        <Anchor size="sm" component="button" onClick={handleLogin}>
          Sign In
        </Anchor>
      </Text>

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
          placeholder="Your password"
          value={password}
          onChange={onPasswordChange}
          required
          mt="md"
        />
        <Button fullWidth mt="xl">
          Register
        </Button>
      </Paper>
    </Container>
  );
}

export default Register;
