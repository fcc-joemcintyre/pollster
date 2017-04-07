import React, { PropTypes } from 'react';
import { Route, Redirect } from 'react-router';

const AuthRoute = ({ component, authenticated, ...rest }) => {
  return (<Route
    {...rest}
    render={(routeProps) => {
      if (authenticated) {
        return React.createElement (component, routeProps);
      } else {
        return (<Redirect
          to={{
            pathname: '/login',
            state: { from: routeProps.location },
          }}
        />);
      }
    }}
  />);
};

export default AuthRoute;

AuthRoute.propTypes = {
  component: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
};
