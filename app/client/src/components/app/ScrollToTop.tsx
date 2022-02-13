import { useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

/**
 * Function called on route change
 * @param props Props
 * @returns Children to render
 */
const C = ((props: RouteComponentProps) => {
  const { children, location: { pathname } } = props;
  useEffect (() => {
    window.scrollTo (0, 0);
  }, [pathname]);

  return children || null;
});

export const ScrollToTop = withRouter (C);
