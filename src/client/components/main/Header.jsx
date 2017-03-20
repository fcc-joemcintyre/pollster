import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { logout } from '../../store/userActions';

// Header with application and common navigation
const Header = ({ loggedIn }, context) => {
  const appLinks = [];
  const titleLinks = [];

  appLinks.push (<li key='a1'><NavLink to='/' exact activeClassName='active'>Polls</NavLink></li>);
  if (loggedIn) {
    appLinks.push (<li key='a2'><NavLink to='/manage' activeClassName='active'>Manage</NavLink></li>);
    appLinks.push (<li key='a3'><NavLink to='/results' activeClassName='active'>Results</NavLink></li>);
    appLinks.push (<li key='a4'><NavLink to='/profile' activeClassName='active'>Profile</NavLink></li>);
    titleLinks.push (
      <li key='t1' onClick={() => { context.store.dispatch (logout ()); }}><Link to='/'>Logout</Link></li>
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

export default Header;

Header.propTypes = {
  loggedIn: React.PropTypes.bool.isRequired,
};

Header.contextTypes = {
  store: React.PropTypes.object.isRequired,
};
