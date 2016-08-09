import React from 'react';
import { Link, IndexLink } from 'react-router';

// Header with application and common navigation
const Nav = ({ loggedIn }) => {
  let appLinks = [];
  let titleLinks = [];

  appLinks.push (<li key='a1'><IndexLink to='/' activeClassName='active'>Polls</IndexLink></li>);
  if (loggedIn) {
    appLinks.push (<li key='a2'><Link to='/manage' activeClassName='active'>Manage</Link></li>);
    appLinks.push (<li key='a3'><Link to='/results' activeClassName='active'>Results</Link></li>);
    appLinks.push (<li key='a4'><Link to='/profile' activeClassName='active'>Profile</Link></li>);
    titleLinks.push (<li key='t1'><Link to='/logout'>Logout</Link></li>);
  } else {
    titleLinks.push (<li key='t2'><Link to='/register'>Register</Link></li>);
    titleLinks.push (<li key='t3'><Link to='/login'>Login</Link></li>);
  }
  appLinks.push (<li key='a5'><Link to='/about' activeClassName='active'>About</Link></li>);

  return (
    <div className='nav'>
      <div className='navTitle'>
        <h1>Pollster</h1>
        <ul style={{ float: 'right' }}>
          {titleLinks}
        </ul>
      </div>
      <div className='navApp'>
        <ul style={{ float: 'left' }}>
          {appLinks}
        </ul>
      </div>
    </div>
  );
};

export default Nav;

Nav.propTypes = {
  loggedIn: React.PropTypes.bool.isRequired,
};
