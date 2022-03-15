import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { AppBar, Button, Drawer, IconButton, List, ListItemText, ListItem,
  Toolbar, Typography, useMediaQuery }
  from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Login } from '../login';

export const NavUnauth = () => {
  const [dialog, setDialog] = useState<JSX.Element | undefined> (undefined);
  const mobile = useMediaQuery ('(max-width: 767px)');

  const onClose = useCallback (() => {
    setDialog (undefined);
  }, [setDialog]);

  const onLoggedIn = useCallback (() => {
    /* no op */
  }, []);

  const onLogin = useCallback (() => {
    setDialog (<Login onClose={onClose} onLogin={onLoggedIn} />);
  }, [setDialog, onClose, onLoggedIn]);

  return (
    <>
      { mobile ? (
        <MobileNav onLogin={onLogin} />
      ) : (
        <DesktopNav onLogin={onLogin} />
      )}
      {dialog}
    </>
  );
};

const MobileNav = ({ onLogin }) => {
  const [drawer, setDrawer] = useState (false);
  const navigate = useNavigate ();
  const path = useLocation ().pathname;

  const onToggleDrawer = (open) => (e) => {
    // ignore if tab or shift keys to allow keyboard navigation
    if (!((e.type === 'keydown') && (e.key === 'Tab' || e.key === 'Shift'))) {
      setDrawer (open);
    }
  };

  return (
    <>
      <AppBar position='fixed'>
        <StyledToolbar>
          <Title onClick={() => navigate ('/')}>
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
            variant='temporary'
            anchor='right'
            open={drawer}
            onClose={onToggleDrawer (false)}
          >
            <Toolbar sx={{ backgroundColor: (theme) => theme.palette.primary.main }} />
            <div
              role='presentation'
              style={{ height: '100%' }}
              onClick={onToggleDrawer (false)}
              onKeyDown={onToggleDrawer (false)}
            >
              <List sx={{ backgroundColor: '#000', height: '100%' }}>
                <Link to='/about' style={{ textDecoration: 'none' }}>
                  <ListItem button selected={path === '/about'}>
                    <ListItemText sx={{ color: 'white' }}>ABOUT</ListItemText>
                  </ListItem>
                </Link>
                <Link to='/register' style={{ textDecoration: 'none' }}>
                  <ListItem button selected={path === '/register'}>
                    <ListItemText sx={{ color: 'white' }}>REGISTER</ListItemText>
                  </ListItem>
                </Link>
                <ListItem button selected={false} onClick={onLogin}>
                  <ListItemText sx={{ color: 'white' }}>LOGIN</ListItemText>
                </ListItem>
              </List>
            </div>
          </Drawer>
        </StyledToolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

MobileNav.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

const DesktopNav = ({ onLogin }) => {
  const navigate = useNavigate ();

  return (
    <>
      <AppBar position='fixed'>
        <StyledToolbar>
          <div>
            <Title onClick={() => navigate ('/')}>
              Pollster
            </Title>
          </div>
          <div>
            <Link to='/about' style={{ textDecoration: 'none' }}>
              <Button variant='text' sx={{ color: '#fff' }}>ABOUT</Button>
            </Link>
            <Link to='/register' style={{ textDecoration: 'none' }}>
              <Button variant='text' sx={{ color: '#fff' }}>REGISTER</Button>
            </Link>
            <Button variant='text' sx={{ color: '#fff' }} onClick={onLogin}>
              LOGIN
            </Button>
          </div>
        </StyledToolbar>
      </AppBar>
      <Toolbar />
    </>
  );
};

DesktopNav.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

const StyledToolbar = styled (Toolbar)`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  padding: 0 4px;
`;

const Title = styled (Typography)`
  font-size: 30px;
  vertical-align: top;
  text-shadow: 1px 1px 1px #3333ff;
  line-height: 1.0;
  cursor: pointer;
`;
