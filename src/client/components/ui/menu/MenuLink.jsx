import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const MenuLink = ({ children, func, ...rest }) => {
  return (
    <li
      className='app-menu-item'
      onClick={() => {
        if (func) { func (); }
      }}
    >
      <Link {...rest}>{children}</Link>
    </li>
  );
};

export default MenuLink;

MenuLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  func: PropTypes.func,
};

MenuLink.defaultProps = {
  func () { /* noop */ },
};
