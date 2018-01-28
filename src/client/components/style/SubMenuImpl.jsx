import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { MenuSpacer, MenuFloating } from './Menu';

class SubMenuImpl extends Component {
  constructor (props) {
    super (props);
    this.state = {
      show: false,
    };
    this.onToggle = this.onToggle.bind (this);
    this.onHide = this.onHide.bind (this);
  }

  onToggle () {
    this.setState (prev => ({ show: ! prev.show }));
  }

  onHide () {
    this.setState ({ show: false });
  }

  render () {
    const { text, right, children, className, ...rest } = this.props;
    return (
      <div className={className} {...rest} onMouseLeave={this.onHide}>
        <span onClick={this.onToggle}>{text}</span>
        { this.state.show &&
          <Fragment>
            <MenuSpacer right={right} />
            <MenuFloating right={right} onClick={this.onHide}>
              {children}
            </MenuFloating>
          </Fragment>
        }
      </div>
    );
  }
}

SubMenuImpl.propTypes = {
  text: PropTypes.string.isRequired,
  right: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
};

SubMenuImpl.defaultProps = {
  right: false,
  children: null,
  className: '',
};

export default SubMenuImpl;
