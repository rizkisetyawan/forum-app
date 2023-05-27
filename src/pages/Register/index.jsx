import {
  Anchor, Container, Space, Text, Title
} from '@mantine/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RegisterInput } from '../../components';
import { asyncRegisterUser } from '../../states/users/action';

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleToPageLogin = () => {
    navigate('/login');
  };

  const handleRegister = (body) => {
    dispatch(asyncRegisterUser(body));
    handleToPageLogin();
  };

  return (
    <Container size={380} my={40} pt={80}>
      <Title
        align="center"
        sx={(theme) => ({
          fontFamily: `Greycliff CF, ${theme.fontFamily}`,
          fontWeight: 900
        })}
      >
        Forum App
      </Title>
      <Text color="dimmed" size="sm" align="center" mt={5}>
        Already have an account ?
        <Space w="sm" />
        <Anchor size="sm" component="button" onClick={handleToPageLogin}>
          Sign In
        </Anchor>
      </Text>

      <RegisterInput onRegister={handleRegister} />
    </Container>
  );
}

export default Register;
