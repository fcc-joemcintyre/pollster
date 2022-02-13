import { Route, useHistory } from 'react-router-dom';
import { Login } from '../login';

type Props = {
  exact?: boolean,
  path: string,
  authenticated: boolean, 
  children: React.ReactNode, 
};

/**
 * Protected route handler, display login if not authenticated
 * @param Props
 * @returns Route handler component
 */
export const AuthRoute = ({ exact = false, path, authenticated, children }: Props) => {
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
