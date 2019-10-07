import React from 'react';
import PropTypes from 'prop-types';
import { Route, useHistory } from 'react-router-dom';
import { LoginPage } from '../User';

export const AuthRoute = ({ component, authenticated, ...rest }) => {
  const history = useHistory ();
  return (
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
};

AuthRoute.propTypes = {
  component: PropTypes.shape ({}).isRequired,
  authenticated: PropTypes.bool.isRequired,
};
