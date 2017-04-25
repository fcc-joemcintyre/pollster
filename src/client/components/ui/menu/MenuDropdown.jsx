import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MenuFloating from './MenuFloating.jsx';

export default class MenuDropdown extends Component {
  constructor (props) {
    super (props);
    this.state = {
      show: props.show,
    };
  }

  render () {
    return (
      <div className={this.props.className}>
        <div
          className='app-menu-icon'
          onClick={() => { this.setState ((prevState) => { return { show: ! prevState.show }; }); }}
        >
          <div className='app-menu-iconBar' />
          <div className='app-menu-iconBar' />
          <div className='app-menu-iconBar' />
        </div>
        { this.state.show &&
          <MenuFloating
            show={this.state.show}
            onClose={() => { this.setState (() => { return { show: false }; }); }}
          >
            { this.props.children }
          </MenuFloating>
        }
      </div>
    );
  }
}

MenuDropdown.propTypes = {
  className: PropTypes.string.isRequired,
  show: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

MenuDropdown.defaultProps = {
  show: false,
};
