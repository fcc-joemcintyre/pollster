import React from 'react';
import { Link, IndexLink } from 'react-router';
import { logout } from '../../store/userActions';

// Header with application and common navigation
const Header = ({ loggedIn }, context) => {
  const appLinks = [];
  const titleLinks = [];

  appLinks.push (<li key='a1'><IndexLink to='/' activeClassName='active'>Polls</IndexLink></li>);
  if (loggedIn) {
    appLinks.push (<li key='a2'><Link to='/manage' activeClassName='active'>Manage</Link></li>);
    appLinks.push (<li key='a3'><Link to='/results' activeClassName='active'>Results</Link></li>);
    appLinks.push (<li key='a4'><Link to='/profile' activeClassName='active'>Profile</Link></li>);
    titleLinks.push (
      <li key='t1' onClick={() => { context.store.dispatch (logout ()); }}><Link to='/'>Logout</Link></li>
    );
  } else {
    titleLinks.push (<li key='t2'><Link to='/register'>Register</Link></li>);
    titleLinks.push (<li key='t3'><Link to='/login'>Login</Link></li>);
  }
  appLinks.push (<li key='a5'><Link to='/about' activeClassName='active'>About</Link></li>);

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
