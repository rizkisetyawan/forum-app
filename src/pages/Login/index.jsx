import {
  Anchor,
  Container,
  Space,
  Text,
  Title
} from '@mantine/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoginInput } from '../../components';
import { asyncSetAuthUser } from '../../states/authUser/action';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (body) => {
    dispatch(asyncSetAuthUser(body));
  };

  const handleToPageRegister = () => {
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
        Don&#39;t have an account yet?
        <Space w="sm" />
        <Anchor size="sm" component="button" onClick={handleToPageRegister}>
          Create account
        </Anchor>
      </Text>
      <LoginInput onLogin={handleLogin} />
    </Container>
  );
}

export default Login;
