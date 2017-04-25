import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '../../store/userActions';
import { Menu, MenuLink, MenuNavLink, MenuSeparator, MenuSubmenu } from '../ui/menu/index';

// Header with application and common navigation
class Header extends Component {
  constructor (props) {
    super (props);

    this.menuDropdownUnauthenticated = (
      <Menu className='app-menu-dropdown' dropDown>
        <MenuNavLink to='/' exact>Home</MenuNavLink>
        <MenuNavLink to='/about'>About</MenuNavLink>
        <MenuSeparator spacing='4px' />
        <MenuNavLink to='/register'>Register</MenuNavLink>
        <MenuNavLink to='/login'>Login</MenuNavLink>
      </Menu>
    );
    this.menuDropdownAuthenticated = (
      <Menu className='app-menu-dropdown' dropDown>
        <MenuNavLink to='/' exact>Home</MenuNavLink>
        <MenuNavLink to='/manage'>Manage</MenuNavLink>
        <MenuNavLink to='/results'>Results</MenuNavLink>
        <MenuNavLink to='/about'>About</MenuNavLink>
        <MenuNavLink to='/profile'>Profile</MenuNavLink>
        <MenuSeparator spacing='4px' />
        <MenuLink to='/' func={() => { props.dispatch (logout ()); }}>Logout</MenuLink>
      </Menu>
    );

    this.menuRightUnauthenticated = (
      <Menu className='app-menu-bar app-menu-right'>
        <MenuNavLink to='/register'>Register</MenuNavLink>
        <MenuNavLink to='/login'>Login</MenuNavLink>
      </Menu>
    );
    this.menuRightAuthenticated = (
      <Menu className='app-menu-bar app-menu-right'>
        <MenuSubmenu text='User'>
          <MenuNavLink to='/profile'>Profile</MenuNavLink>
          <MenuLink to='/' func={() => { props.dispatch (logout ()); }}>Logout</MenuLink>
        </MenuSubmenu>
      </Menu>
    );

    this.menuLeftUnauthenticated = (
      <Menu className='app-menu-bar app-menu-left'>
        <MenuNavLink to='/' exact>Home</MenuNavLink>
        <MenuNavLink to='/about'>About</MenuNavLink>
      </Menu>
    );
    this.menuLeftAuthenticated = (
      <Menu className='app-menu-bar app-menu-left'>
        <MenuNavLink to='/' exact>Home</MenuNavLink>
        <MenuNavLink to='/manage'>Manage</MenuNavLink>
        <MenuNavLink to='/results'>Results</MenuNavLink>
        <MenuNavLink to='/about'>About</MenuNavLink>
      </Menu>
    );

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
    if (this.state.innerWidth < 768) {
      return (
        <div className='app-h-area'>
          <div className='app-h-small'>
            {this.props.authenticated ? this.menuDropdownAuthenticated : this.menuDropdownUnauthenticated}
            <div className='app-h-smallTitle'>Pollster</div>
          </div>
        </div>
      );
    } else {
      return (
        <div className='app-h-area'>
          <div className='app-h-line1'>
            {this.props.authenticated ? this.menuRightAuthenticated : this.menuRightUnauthenticated}
            <div className='app-h-title'>Pollster</div>
          </div>
          <div className='app-h-line2'>
            {this.props.authenticated ? this.menuLeftAuthenticated : this.menuLeftUnauthenticated}
          </div>
        </div>
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
  dispatch: PropTypes.func.isRequired,
};
