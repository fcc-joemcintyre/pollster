import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Box, Flex, FlexItem, MenuBar, MenuDropdown, MenuItem, MenuSeparator, MenuSubmenu } from 'uikit';
import { useAuth } from '../../data/useAuth';
import { Login } from '../login';

const StyledMenuDropdown = styled (MenuDropdown)`
  display: inline-block;
  margin-top: 4px;
  margin-right: 4px;
`;

export const Nav = ({ menu }) => {
  const query = useAuth ();
  const [login, setLogin] = useState (false);
  const [innerWidth, setInnerWidth] = useState (window.innerWidth);
  const authenticated = query.isSuccess && query.data.key !== 0;

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
          <Flex>
            <Title as={NavLink} to='/'>Pollster</Title>
            <FlexItem grow basis='6px' />
            { menu && collapse && (
              <StyledMenuDropdown right spacer={8}>
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
            { menu && !collapse && authenticated && (
              <>
                <Flex mt='4px'>
                  <MenuBar>
                    <MenuItem as={NavLink} to='/manage'>Manage</MenuItem>
                    <MenuItem as={NavLink} to='/results'>Results</MenuItem>
                    <MenuItem as={NavLink} to='/about'>About</MenuItem>
                    <MenuSubmenu text='User' right spacer='2px'>
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
                  <MenuItem as={NavLink} to='/about'>About</MenuItem>
                  <MenuItem as={NavLink} to='/register'>Register</MenuItem>
                  <MenuItem onClick={() => setLogin (!login)}>
                    Login
                  </MenuItem>
                </MenuBar>
              </Flex>
            )}
          </Flex>
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
  padding: 4px;

  @media (max-width: 300px) {
    height: 40px;
  }
`;

export const Title = styled.div`
  font-family: 'Merriweather', sans-serif;
  font-size: 30px;
  font-style: italic;
  display: inline-block;
  vertical-align: top;
  text-shadow: 2px 2px 2px #ffffff;
  line-height: 1.0;
  color: #000000;
  text-decoration: none;
`;
