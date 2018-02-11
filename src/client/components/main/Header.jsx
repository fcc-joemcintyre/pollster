import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Flex } from '../style/Layout';
import { DropMenu, MenuBar, MenuNavLink, MenuSeparator, SubMenu } from '../style/Menu';
import { FixedHeader, Content, Title } from '../style/Header';

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
    this.setState (() => ({ innerWidth: window.innerWidth }));
  }

  render () {
    if (this.state.innerWidth < 320) {
      return (
        <FixedHeader>
          <Content>
            {this.props.authenticated ?
              <DropMenu m='10px 8px 0 4px'>
                <MenuNavLink to='/' exact>Home</MenuNavLink>
                <MenuNavLink to='/manage'>Manage</MenuNavLink>
                <MenuNavLink to='/results'>Results</MenuNavLink>
                <MenuNavLink to='/about'>About</MenuNavLink>
                <MenuNavLink to='/profile'>Profile</MenuNavLink>
                <MenuSeparator spacing='4px' />
                <MenuNavLink to='/logout'>Logout</MenuNavLink>
              </DropMenu> :
              <DropMenu m='10px 8px 0 4px'>
                <MenuNavLink to='/' exact>Home</MenuNavLink>
                <MenuNavLink to='/about'>About</MenuNavLink>
                <MenuSeparator spacing='4px' />
                <MenuNavLink to='/register'>Register</MenuNavLink>
                <MenuNavLink to='/login'>Login</MenuNavLink>
              </DropMenu>
            }
            <Title>Pollster</Title>
          </Content>
        </FixedHeader>
      );
    } else {
      return (
        <FixedHeader>
          <Content>
            <Title>Pollster</Title>
            <Flex>
              {this.props.authenticated ?
                <MenuBar mt='12px'>
                  <MenuNavLink to='/' exact>Home</MenuNavLink>
                  <MenuNavLink to='/manage'>Manage</MenuNavLink>
                  <MenuNavLink to='/results'>Results</MenuNavLink>
                  <MenuNavLink to='/about'>About</MenuNavLink>
                </MenuBar> :
                <MenuBar mt='12px'>
                  <MenuNavLink to='/' exact>Home</MenuNavLink>
                  <MenuNavLink to='/about'>About</MenuNavLink>
                </MenuBar>
              }
              {this.props.authenticated ?
                <MenuBar right mt='12px'>
                  <SubMenu text='User' right>
                    <MenuNavLink to='/profile'>Profile</MenuNavLink>
                    <MenuNavLink to='/logout'>Logout</MenuNavLink>
                  </SubMenu>
                </MenuBar> :
                <MenuBar right mt='12px'>
                  <MenuNavLink to='/register'>Register</MenuNavLink>
                  <MenuNavLink to='/login'>Login</MenuNavLink>
                </MenuBar>
              }
            </Flex>
          </Content>
        </FixedHeader>
      );
    }
  }
}

const mapStateToProps = ({ user }) => ({
  authenticated: user.authenticated,
});

export default connect (mapStateToProps, null, null, { pure: false }) (Header);

Header.propTypes = {
  authenticated: PropTypes.bool.isRequired,
};
