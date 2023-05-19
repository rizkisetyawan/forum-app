/* eslint-disable react/prop-types */
import {
  Box,
  Navbar,
  Stack,
  Tooltip,
  UnstyledButton,
  createStyles,
  rem,
} from '@mantine/core';
import {
  IconChartBar,
  IconLogin,
  IconLogout,
  IconMessage,
} from '@tabler/icons-react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { asyncUnsetAuthUser } from '../../states/authUser/action';

const useStyles = createStyles((theme) => ({
  link: {
    width: rem(50),
    height: rem(50),
    borderRadius: theme.radius.md,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.white,
    opacity: 0.85,

    '&:hover': {
      opacity: 1,
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
          .background || '',
        0.1
      ),
    },
  },

  active: {
    opacity: 1,
    '&, &:hover': {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: 'filled', color: theme.primaryColor })
          .background || '',
        0.15
      ),
    },
  },
}));

function NavbarLink({
  icon: Icon, label, active, onClick
}) {
  const { classes, cx } = useStyles();
  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton
        onClick={onClick}
        className={cx(classes.link, { [classes.active]: active })}
      >
        <Icon size={28} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const mockdata = [
  { icon: IconMessage, label: 'Threads', path: '/' },
  { icon: IconChartBar, label: 'Leaderboards', path: 'leaderboards' },
];

function NavbarComponent() {
  const [active, setActive] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authUser } = useSelector((states) => states);

  const links = mockdata.map((link, index) => (
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
        p="sm"
        pos="fixed"
        sx={(theme) => ({
          backgroundColor: theme.fn.variant({
            variant: 'filled',
            color: theme.primaryColor,
          }).background,
        })}
      >
        <Navbar.Section grow mt={32}>
          <Stack justify="center" spacing={0}>
            {links}
          </Stack>
        </Navbar.Section>
        <Navbar.Section>
          <Stack justify="center" spacing={0}>
            {authUser ? (
              <NavbarLink icon={IconLogout} label="Logout" onClick={handleLogout} active={active === 'login'} />
            ) : (
              <NavbarLink icon={IconLogin} label="Login" onClick={handleLogin} active={active === 'login'} />
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

export default NavbarComponent;
