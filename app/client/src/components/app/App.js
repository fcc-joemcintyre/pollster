import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { verifyLogin } from '../../store/userActions';
import { initPolls } from '../../store/pollsActions';
import { Home } from '../home';
import { Register, Profile } from '../user';
import { Poll } from '../poll';
import { Manage } from '../manage';
import { Result } from '../result';
import { About } from '../about';
import { Logout } from '../logout';
import { getTheme } from './theme';
import { GlobalStyle } from './GlobalStyle';
import { AuthRoute } from './AuthRoute';
import { Loading } from './Loading';
import { Nav } from './Nav';
import { NotFound } from './NotFound';
import { ScrollToTop } from './ScrollToTop';

export const App = () => {
  const [query, setQuery] = useState ({ loading: true, error: '' });
  const dispatch = useDispatch ();
  const authenticated = useSelector ((state) => state.user.authenticated);
  const themeName = useSelector ((state) => state.user.theme || 'base');

  useEffect (() => {
    (async () => {
      try {
        await dispatch (verifyLogin ());
        await dispatch (initPolls ());
        setQuery ({ loading: false, error: '' });
      } catch (err) {
        setQuery ({ loading: false, error: 'Network error, try again.' });
      }
    }) ();
  }, [dispatch]);

  const theme = getTheme (themeName);
  return (
    <BrowserRouter>
      <ScrollToTop>
        <ThemeProvider theme={theme}>
          <>
            <GlobalStyle />
            { query.loading || query.error ? (
              <>
                <Nav menu={false} />
                <Loading message={query.error || 'Loading...'} />
              </>
            ) : (
              <>
                <Nav menu />
                <Switch>
                  <Route exact path='/'><Home /></Route>
                  <Route exact path='/register'><Register /></Route>
                  <AuthRoute exact path='/profile' authenticated={authenticated}><Profile /></AuthRoute>
                  <Route exact path='/polls/:key'><Poll /></Route>
                  <AuthRoute exact path='/manage' authenticated={authenticated}><Manage /></AuthRoute>
                  <AuthRoute exact path='/results' authenticated={authenticated}><Result /></AuthRoute>
                  <Route exact path='/about'><About /></Route>
                  <Route exact path='/logout'><Logout /></Route>
                  <Route path='*'><NotFound /></Route>
                </Switch>
              </>
            )}
          </>
        </ThemeProvider>
      </ScrollToTop>
    </BrowserRouter>
  );
};
