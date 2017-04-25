import React from 'react';
import PropTypes from 'prop-types';
import MenuDropdown from './MenuDropdown.jsx';

const Menu = ({ className, dropDown, children }) => {
  if (dropDown) {
    return (
      <MenuDropdown className={className}>{children}</MenuDropdown>
    );
  } else {
    return (
      <div className={className}>{children}</div>
    );
  }
};

export default Menu;

Menu.propTypes = {
  className: PropTypes.string.isRequired,
  dropDown: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

Menu.defaultProps = {
  dropDown: false,
};
