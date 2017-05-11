import React from 'react';
import PropTypes from 'prop-types';

const MenuFloating = ({ show, children, onClose }) => {
  return (
    <div
      className='app-menu-sub-wrapper'
      onMouseLeave={onClose}
      onClick={onClose}
    >
      <div className={`app-menu-sub ${show ? 'app-menu-sub-show' : 'app-menu-sub-hide'}`}>
        { children }
      </div>
    </div>
  );
};

MenuFloating.propTypes = {
  show: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default MenuFloating;
