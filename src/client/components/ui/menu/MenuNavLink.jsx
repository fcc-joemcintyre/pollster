import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

const MenuNavLink = ({ children, ...rest }) => {
  return (
    <div className='app-menu-item'>
      <NavLink {...rest}>{children}</NavLink>
    </div>
  );
};

export default MenuNavLink;

MenuNavLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
