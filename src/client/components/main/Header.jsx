import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { logout } from '../../store/userActions';

// Header with application and common navigation
const Header = (props) => {
  const appLinks = [];
  const titleLinks = [];

  appLinks.push (<li key='a1'><NavLink to='/' exact activeClassName='active'>Polls</NavLink></li>);
  if (props.authenticated) {
    appLinks.push (<li key='a2'><NavLink to='/manage' activeClassName='active'>Manage</NavLink></li>);
    appLinks.push (<li key='a3'><NavLink to='/results' activeClassName='active'>Results</NavLink></li>);
    appLinks.push (<li key='a4'><NavLink to='/profile' activeClassName='active'>Profile</NavLink></li>);
    titleLinks.push (
      <li key='t1' onClick={() => { props.dispatch (logout ()); }}><Link to='/'>Logout</Link></li>
    );
  } else {
    titleLinks.push (<li key='t2'><NavLink to='/register'>Register</NavLink></li>);
    titleLinks.push (<li key='t3'><NavLink to='/login'>Login</NavLink></li>);
  }
  appLinks.push (<li key='a5'><NavLink to='/about' activeClassName='active'>About</NavLink></li>);

  return (
    <div className='app-h-area'>
      <div className='app-h-line1'>
        <div className='app-h-title'>Pollster</div>
        <ul className='app-h-menuRight'>
          {titleLinks}
        </ul>
      </div>
      <div className='app-h-line2'>
        <ul className='app-h-menuLeft'>
          {appLinks}
        </ul>
      </div>
    </div>
  );
};

const mapStateToProps = ({ user }) => {
  return ({
    authenticated: user.authenticated,
  });
};

export default connect (mapStateToProps) (Header);

Header.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};
