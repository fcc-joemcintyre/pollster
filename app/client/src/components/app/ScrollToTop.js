// @ts-check
import { useEffect } from 'react';
import { withRouter } from 'react-router-dom';

/**
  @typedef {import ('react-router-dom').RouteComponentProps } RouteComponentProps
*/

/**
 * Function called on route change
 * @param {React.ComponentType<RouteComponentProps>} props Props
 * @returns {any} Children to render
 */
const C = ((props) => {
  const { children, location: { pathname } } = props;
  useEffect (() => {
    window.scrollTo (0, 0);
  }, [pathname]);

  return children || null;
});

export const ScrollToTop = withRouter (C);
