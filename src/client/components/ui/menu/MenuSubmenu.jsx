import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuFloating from './MenuFloating.jsx';

export default class MenuSubmenu extends Component {
  constructor (props) {
    super (props);
    this.state = {
      show: props.show,
    };
    this.closeFloatingMenu = this.closeFloatingMenu.bind (this);
  }

  closeFloatingMenu () {
    this.setState (() => { return { show: false }; });
  }

  render () {
    return (
      <div
        className='app-menu-item'
        onMouseLeave={this.closeFloatingMenu}
      >
        <span
          className='app-menu-downArrow'
          onClick={() => { this.setState ((prevState) => { return { show: ! prevState.show }; }); }}
        >
          {this.props.text}
        </span>
        <div className='app-menu-sub-spacer' />
        <MenuFloating show={this.state.show} onClose={this.closeFloatingMenu}>
          { this.props.children }
        </MenuFloating>
      </div>
    );
  }
}

MenuSubmenu.propTypes = {
  show: PropTypes.bool,
  text: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

MenuSubmenu.defaultProps = {
  show: false,
};
