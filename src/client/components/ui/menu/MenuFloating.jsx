import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class MenuFloating extends Component {
  constructor (props) {
    super (props);
  }

  render () {
    return (
      <div
        className='app-menu-sub-wrapper'
        onMouseLeave={this.props.onClose}
        onClick={this.props.onClose}
      >
        <div className={`app-menu-sub ${this.props.show ? 'app-menu-sub-show' : 'app-menu-sub-hide'}`}>
          { this.props.children }
        </div>
      </div>
    );
  }
}

MenuFloating.propTypes = {
  show: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};
