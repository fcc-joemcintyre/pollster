// @ts-check
import { Route, useHistory } from 'react-router-dom';
import { Login } from '../login';

/**
  @typedef {Object} Props
  @property {boolean=} exact
  @property {string} path
  @property {boolean} authenticated
  @property {React.ReactNode} children
*/

/**
 * Protected route handler, display login if not authenticated
 * @param {Props} param0 Props
 * @returns {JSX.Element} Route handler component
 */
export const AuthRoute = ({ exact = false, path, authenticated, children }) => {
  const history = useHistory ();
  return (
    <Route
      exact={exact}
      path={path}
      render={() => (
        authenticated ? (
          children
        ) : (
          <Login
            onLogin={() => { /* no op */ }}
            onClose={() => history.push ('/')}
          />
        )
      )}
    />
  );
};
