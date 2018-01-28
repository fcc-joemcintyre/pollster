import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { AppMenuSpacer, AppMenuFloating } from './Menu';

class AppMenuImpl extends Component {
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
    const { right, children, className, ...rest } = this.props;
    return (
      <div className={className} {...rest} onMouseLeave={this.onHide}>
        <Icon onClick={this.onToggle}>
          <IconBar />
          <IconBar />
          <IconBar />
        </Icon>
        { this.state.show &&
          <Fragment>
            <AppMenuSpacer right={right} />
            <AppMenuFloating right={right} onClick={this.onHide}>
              {children}
            </AppMenuFloating>
          </Fragment>
        }
      </div>
    );
  }
}

AppMenuImpl.propTypes = {
  right: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
};

AppMenuImpl.defaultProps = {
  right: false,
  children: null,
  className: '',
};

export default AppMenuImpl;

const Icon = styled.div`
  margin: 10px 8px 8px 8px;
  height: 22px;
  width: 22px;
  background-color: white;
  border: 1px solid black;
`;

const IconBar = styled.div`
  height: 2px;
  width: 16px;
  margin: 4px 0px 0px 3px;
  border: 0px;
  border-radius: 1px;
  background-color: #7AC1C1;
`;
