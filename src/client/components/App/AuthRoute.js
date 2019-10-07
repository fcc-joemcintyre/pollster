import React from 'react';
import PropTypes from 'prop-types';
import { Route, withRouter } from 'react-router-dom';
import { LoginPage } from '../User';

export const AuthRouteBase = ({ component, authenticated, history, ...rest }) => (
  <Route
    {...rest}
    render={routeProps => (
      authenticated ? (
        React.createElement (component, routeProps)
      ) : (
        <LoginPage
          onLogin={() => { /* no op */ }}
          onCancel={() => history.push ('/')}
        />
      )
    )}
  />
);

export const AuthRoute = withRouter (AuthRouteBase);

AuthRouteBase.propTypes = {
  component: PropTypes.shape ({}).isRequired,
  authenticated: PropTypes.bool.isRequired,
  history: PropTypes.shape ({
    push: PropTypes.func,
  }).isRequired,
};
