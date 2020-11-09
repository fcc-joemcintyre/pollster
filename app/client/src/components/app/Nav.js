import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Box, Flex, FlexItem, MenuBar, MenuDropdown, MenuItem, MenuSeparator, MenuSubmenu } from 'uikit';
import { Login } from '../user';

const StyledMenuDropdown = styled (MenuDropdown)`
  display: inline-block;
  padding: 4px;
  margin-top: 8px;
  margin-right: 8px;
`;

export const Nav = ({ menu }) => {
  const [login, setLogin] = useState (false);
  const [innerWidth, setInnerWidth] = useState (window.innerWidth);
  const authenticated = useSelector ((state) => state.user.authenticated);

  useEffect (() => {
    window.addEventListener ('resize', onResize);
    return (() => window.removeEventListener ('resize', onResize));
  }, []);

  function onResize () {
    setInnerWidth (window.innerWidth);
  }

  function onCloseLogin () {
    setLogin (false);
  }

  const collapse = innerWidth < 420;
  return (
    <>
      <Container>
        <Content>
          { (!menu) &&
            <Title>Pollster</Title>
          }
          { menu && collapse && (
            <StyledMenuDropdown m='10px 8px 0 4px' spacer={8}>
              <MenuItem as={NavLink} to='/' exact>Home</MenuItem>
              { authenticated && <MenuItem as={NavLink} to='/manage'>Manage</MenuItem> }
              { authenticated && <MenuItem as={NavLink} to='/results'>Results</MenuItem> }
              <MenuItem as={NavLink} to='/about'>About</MenuItem>
              { authenticated && <MenuItem as={NavLink} to='/profile'>Profile</MenuItem> }
              <MenuSeparator spacing='4px' />
              { authenticated && <MenuItem as={NavLink} to='/logout'>Logout</MenuItem> }
              { (!authenticated) &&
                <MenuItem as={NavLink} to='/register'>Register</MenuItem>
              }
              { (!authenticated) &&
                <MenuItem onClick={() => setLogin (!login)}>Login</MenuItem>
              }
            </StyledMenuDropdown>
          )}
          <Title>Pollster</Title>
          { menu && (!collapse) && authenticated && (
            <>
              <Flex mt='4px'>
                <MenuBar>
                  <MenuItem as={NavLink} to='/' exact>Home</MenuItem>
                  <MenuItem as={NavLink} to='/manage'>Manage</MenuItem>
                  <MenuItem as={NavLink} to='/results'>Results</MenuItem>
                  <MenuItem as={NavLink} to='/about'>About</MenuItem>
                </MenuBar>
                <FlexItem grow basis='6px' />
                <MenuBar>
                  <MenuSubmenu text='User' right spacer='8px'>
                    <MenuItem as={NavLink} to='/profile'>Profile</MenuItem>
                    <MenuItem as={NavLink} to='/logout'>Logout</MenuItem>
                  </MenuSubmenu>
                </MenuBar>
              </Flex>
            </>
          )}
          { menu && (!collapse) && (!authenticated) && (
            <Flex mt='4px'>
              <MenuBar>
                <MenuItem as={NavLink} to='/' exact>Home</MenuItem>
                <MenuItem as={NavLink} to='/about'>About</MenuItem>
              </MenuBar>
              <FlexItem grow basis='6px' />
              <MenuBar>
                <MenuItem as={NavLink} to='/register'>Register</MenuItem>
                <MenuItem onClick={() => setLogin (!login)}>
                  Login
                </MenuItem>
              </MenuBar>
            </Flex>
          )}
        </Content>
      </Container>
      <Box h='72px' />
      { login && (
        <Login
          onLogin={onCloseLogin}
          onCancel={onCloseLogin}
        />
      )}
    </>
  );
};

Nav.propTypes = {
  menu: PropTypes.bool.isRequired,
};

export const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  ${({ theme }) => `
    color: ${theme.colors.navTextColor};
    background-color: ${theme.colors.navColor};
  `}
`;

export const Content = styled.div`
  position: relative;
  max-width: 768px;
  margin: 0 auto;
  height 72px;

  @media (max-width: 300px) {
    height: 40px;
  }
`;

export const Title = styled.div`
  font-family: 'Merriweather', sans-serif;
  font-size: 30px;
  display: inline-block;
  vertical-align: top;
  margin: 8px 0 0 0;
  text-shadow: 2px 2px 2px #ffffff;
  line-height: 1.0;
`;
