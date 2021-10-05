// @ts-check
import { useCallback, useState } from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { AppBar, Divider, Drawer, IconButton, ListItemText, MenuItem, MenuList, Toolbar, Typography }
  from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { useAuth } from '../../data/useAuth';
import { Login } from '../login';

const unauthItems = [
  { key: 1, text: 'Home', to: '/', exact: true, when: 0 },
  { key: 2, text: 'About', to: '/about', exact: true, when: 0 },
  { key: -1 },
  { key: 3, text: 'Register', to: '/register', exact: true, when: 0 },
  { key: 4, text: 'Log in', to: '/login', exact: true, when: 0 },
];
const authItems = [
  { key: 10, text: 'Home', to: '/', exact: true, when: 0 },
  { key: 11, text: 'Manage', to: '/manage', exact: true, when: 0 },
  { key: 12, text: 'Results', to: '/results', exact: true, when: 0 },
  { key: 13, text: 'About', to: '/about', exact: true, when: 0 },
  { key: 14, text: 'Profile', to: '/profile', exact: true, when: 0 },
  { key: -10 },
  { key: 15, text: 'Log out', to: '/logout', exact: true, when: 0 },
];

export const Nav = () => {
  const query = useAuth ();
  const [drawer, setDrawer] = useState (false);
  const [login, setLogin] = useState (false);
  const history = useHistory ();
  const path = useLocation ().pathname;
  const authenticated = query.isSuccess && query.data.key !== 0;

  const onToggleDrawer = (open) => (e) => {
    // ignore if tab or shift keys to allow keyboard navigation
    if (!((e.type === 'keydown') && (e.key === 'Tab' || e.key === 'Shift'))) {
      setDrawer (open);
    }
  };

  const onLogin = useCallback (() => {
    setDrawer (false);
    setLogin (true);
  }, [setDrawer, setLogin]);

  const onCloseLogin = useCallback (() => {
    setLogin (false);
  }, [setLogin]);

  let menus;
  if (query.isLoading) {
    menus = null;
  }
  const items = authenticated ? authItems : unauthItems;
  menus = (
    <MenuList>
      {items.map ((a) => {
        if (a.key < 0) {
          return <Divider key={a.key} />;
        }
        if (a.key === 4) {
          return (
            <a key={a.key} href='#' style={{ textDecoration: 'none' }}>
              <MenuItem selected={false} onClick={onLogin}>
                <ListItemText>{a.text}</ListItemText>
              </MenuItem>
            </a>
          );
        }
        return (
          <NavLink key={a.key} to={a.to} exact={a.exact} style={{ textDecoration: 'none' }}>
            <MenuItem selected={path === a.to}>
              <ListItemText>{a.text}</ListItemText>
            </MenuItem>
          </NavLink>
        );
      })}
    </MenuList>
  );

  return (
    <>
      <AppBar position='fixed'>
        <StyledToolbar>
          <Title onClick={() => history.push ('/')}>
            Pollster
          </Title>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            edge='start'
            onClick={onToggleDrawer (true)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
            anchor='right'
            open={drawer}
            onClose={onToggleDrawer (false)}
          >
            <Toolbar sx={{ backgroundColor: (theme) => theme.palette.primary.main }} />
            <Divider />
            <div
              role='presentation'
              onClick={onToggleDrawer (false)}
              onKeyDown={onToggleDrawer (false)}
            >
              {menus}
            </div>
          </Drawer>
        </StyledToolbar>
      </AppBar>
      { login && <Login onLogin={onCloseLogin} onClose={onCloseLogin} /> }
      <Toolbar />
    </>
  );
};

const StyledToolbar = styled (Toolbar)`
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 4px;
`;

const Title = styled (Typography)`
  font-size: 30px;
  flex-grow: 1;
  vertical-align: top;
  text-shadow: 1px 1px 1px #3333ff;
  line-height: 1.0;
  cursor: pointer;
`;
