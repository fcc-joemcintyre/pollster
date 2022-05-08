import { useCallback, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AppBar, Button, Drawer, IconButton, List, ListItemText, ListItem, Toolbar, useMediaQuery }
  from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Login } from '../login';
import { StyledToolbar, Title } from './NavStyles';

type Props = {
  onLogin: () => void,
};

const MobileNav = ({ onLogin }: Props) => {
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

const DesktopNav = ({ onLogin }: Props) => {
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

export const NavUnauth = () => {
  const [dialog, setDialog] = useState<JSX.Element | undefined> (undefined);
  const mobile = useMediaQuery ('(max-width: 767px)');
  const navigate = useNavigate ();

  const onClose = useCallback (() => {
    setDialog (undefined);
  }, [setDialog]);

  const onLoggedIn = useCallback (() => {
    navigate ('/', { replace: true });
  }, [navigate]);

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
