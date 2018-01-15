import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Flex } from '../style/Layout';
import { AppMenu, MenuBar, MenuNavLink, MenuSeparator, SubMenu } from '../style/Menu';
import { FixedFullWidth, RelativeCenteredBox, Title } from '../style/Header';

class Header extends Component {
  constructor (props) {
    super (props);
    this.state = {
      innerWidth: window.innerWidth,
    };

    this.handleResize = this.handleResize.bind (this);
  }

  componentDidMount () {
    window.addEventListener ('resize', this.handleResize);
  }

  componentWillUnmount () {
    window.removeEventListener ('resize', this.handleResize);
  }

  handleResize () {
    this.setState (() => { return { innerWidth: window.innerWidth }; });
  }

  render () {
    if (this.state.innerWidth < 320) {
      return (
        <FixedFullWidth>
          <RelativeCenteredBox>
            <Flex>
              {this.props.authenticated ?
                <AppMenu>
                  <MenuNavLink to='/' exact>Home</MenuNavLink>
                  <MenuNavLink to='/manage'>Manage</MenuNavLink>
                  <MenuNavLink to='/results'>Results</MenuNavLink>
                  <MenuNavLink to='/about'>About</MenuNavLink>
                  <MenuNavLink to='/profile'>Profile</MenuNavLink>
                  <MenuSeparator spacing='4px' />
                  <MenuNavLink to='/logout'>Logout</MenuNavLink>
                </AppMenu> :
                <AppMenu>
                  <MenuNavLink to='/' exact>Home</MenuNavLink>
                  <MenuNavLink to='/about'>About</MenuNavLink>
                  <MenuSeparator spacing='4px' />
                  <MenuNavLink to='/register'>Register</MenuNavLink>
                  <MenuNavLink to='/login'>Login</MenuNavLink>
                </AppMenu>
              }
              <Title ml='60px'>Pollster</Title>
            </Flex>
          </RelativeCenteredBox>
        </FixedFullWidth>
      );
    } else {
      return (
        <FixedFullWidth>
          <RelativeCenteredBox>
            <Title>Pollster</Title>
            <Flex>
              {this.props.authenticated ?
                <MenuBar mt='8px'>
                  <MenuNavLink to='/' exact>Home</MenuNavLink>
                  <MenuNavLink to='/manage'>Manage</MenuNavLink>
                  <MenuNavLink to='/results'>Results</MenuNavLink>
                  <MenuNavLink to='/about'>About</MenuNavLink>
                </MenuBar> :
                <MenuBar mt='8px'>
                  <MenuNavLink to='/' exact>Home</MenuNavLink>
                  <MenuNavLink to='/about'>About</MenuNavLink>
                </MenuBar>
              }
              {this.props.authenticated ?
                <MenuBar right mt='8px'>
                  <SubMenu text='User' right>
                    <MenuNavLink to='/profile'>Profile</MenuNavLink>
                    <MenuNavLink to='/logout'>Logout</MenuNavLink>
                  </SubMenu>
                </MenuBar> :
                <MenuBar right mt='8px'>
                  <MenuNavLink to='/register'>Register</MenuNavLink>
                  <MenuNavLink to='/login'>Login</MenuNavLink>
                </MenuBar>
              }
            </Flex>
          </RelativeCenteredBox>
        </FixedFullWidth>
      );
    }
  }
}

const mapStateToProps = ({ user }) => {
  return ({
    authenticated: user.authenticated,
  });
};

export default connect (mapStateToProps, null, null, { pure: false }) (Header);

Header.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};
