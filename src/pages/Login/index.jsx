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
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useInput } from '../../hooks';
import { asyncSetAuthUser } from '../../states/authUser/action';

function Login() {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = () => {
    dispatch(asyncSetAuthUser({ email, password }));
  };

  const handleRegister = () => {
    navigate('/register');
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
        Do not have an account yet?
        <Space w="sm" />
        <Anchor size="sm" component="button" onClick={handleRegister}>
          Create account
        </Anchor>
      </Text>

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
        <Button fullWidth mt="xl" onClick={handleLogin}>
          Sign in
        </Button>
      </Paper>
    </Container>
  );
}

export default Login;
