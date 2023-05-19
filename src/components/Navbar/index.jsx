import {
  Avatar,
  Box, Center, Navbar, Stack, Tooltip
} from '@mantine/core';
import {
  IconChartBar,
  IconLogin,
  IconLogout,
  IconMessage,
} from '@tabler/icons-react';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { MantineLogo } from '@mantine/ds';
import NavbarLink from '../NavbarLink';
import { asyncUnsetAuthUser } from '../../states/authUser/action';

const listMenu = [
  { icon: IconMessage, label: 'Threads', path: '/' },
  { icon: IconChartBar, label: 'Leaderboards', path: 'leaderboards' },
];

function NavbarComponent() {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authUser } = useSelector((states) => states);

  const links = listMenu.map((link, index) => (
    <NavbarLink
      {...link}
      key={link.label}
      active={index === active}
      onClick={() => {
        setActive(index);
        navigate(link.path);
      }}
    />
  ));

  const handleLogin = () => {
    setActive('login');
    navigate('/login');
  };

  const handleLogout = () => {
    setActive('login');
    dispatch(asyncUnsetAuthUser());
  };

  return (
    <>
      <Navbar
        height="100vh"
        width={{ base: 80 }}
        p="md"
        pos="fixed"
        zIndex={1}
        sx={(theme) => ({
          backgroundColor: theme.fn.variant({
            variant: 'filled',
            color: theme.primaryColor,
          }).background,
        })}
      >
        <Center>
          {authUser ? (
            <Tooltip label={authUser.name} position="right" color="dark">
              <Avatar src={authUser.avatar} radius="xl" size="md" />
            </Tooltip>
          ) : (
            <MantineLogo type="mark" inverted size={30} />
          )}
        </Center>
        <Navbar.Section grow sx={{ display: 'flex', justifyContent: 'center' }}>
          <Stack justify="center" spacing={0}>
            {links}
          </Stack>
        </Navbar.Section>
        <Navbar.Section>
          <Stack justify="center" spacing={0}>
            {authUser ? (
              <NavbarLink
                icon={IconLogout}
                label="Logout"
                onClick={handleLogout}
                active={active === 'login'}
              />
            ) : (
              <NavbarLink
                icon={IconLogin}
                label="Login"
                onClick={handleLogin}
                active={active === 'login'}
              />
            )}
          </Stack>
        </Navbar.Section>
      </Navbar>
      <Box ml={80} sx={{ flex: 1 }}>
        <Outlet />
      </Box>
    </>
  );
}

NavbarComponent.propTypes = {
  // Add prop types here if needed
};

export default NavbarComponent;
