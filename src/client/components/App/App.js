import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { getTheme } from './theme';
import { GlobalStyle } from './GlobalStyle';
import { AuthRoute } from './AuthRoute';
import { Nav } from './Nav';
import { verifyLogin } from '../../store/userActions';
import { initPolls } from '../../store/pollsActions';
import { ScrollToTop } from './ScrollToTop';

import { LoadingPage } from './LoadingPage';
import { HomePage } from '../HomePage';
import { RegisterPage, ProfilePage } from '../User';
import { NotFoundPage } from './NotFoundPage';
import { PollPage } from '../PollPage';
import { ManagePage } from '../ManagePage';
import { ResultPage } from '../ResultPage';
import { AboutPage } from '../AboutPage';
import { LogoutPage } from '../LogoutPage';

export const App = () => {
  const [loading, setLoading] = useState (true);
  const [message, setMessage] = useState ('Loading ...');
  const dispatch = useDispatch ();
  const authenticated = useSelector ((state) => state.user.authenticated);
  const themeName = useSelector ((state) => state.user.theme || 'base');

  useEffect (() => {
    (async () => {
      try {
        await dispatch (verifyLogin ());
        await dispatch (initPolls ());
        setLoading (false);
        setMessage ('');
      } catch (err) {
        setMessage ('Network error, try again.');
      }
    }) ();
  }, [dispatch]);

  const theme = getTheme (themeName);
  if (loading) {
    return (
      <ThemeProvider theme={theme}>
        <Fragment>
          <GlobalStyle />
          <Nav menu={false} />
          <LoadingPage message={message} />
        </Fragment>
      </ThemeProvider>
    );
  }

  return (
    <BrowserRouter>
      <ScrollToTop>
        <ThemeProvider theme={theme}>
          <Fragment>
            <GlobalStyle />
            <Nav menu />
            <Switch>
              <Route exact path='/'><HomePage /></Route>
              <Route exact path='/register'><RegisterPage /></Route>
              <AuthRoute exact path='/profile' authenticated={authenticated}><ProfilePage /></AuthRoute>
              <Route exact path='/polls/:_id'><PollPage /></Route>
              <AuthRoute exact path='/manage' authenticated={authenticated}><ManagePage /></AuthRoute>
              <AuthRoute exact path='/results' authenticated={authenticated}><ResultPage /></AuthRoute>
              <Route exact path='/about'><AboutPage /></Route>
              <Route exact path='/logout'><LogoutPage /></Route>
              <Route path='*'><NotFoundPage /></Route>
            </Switch>
          </Fragment>
        </ThemeProvider>
      </ScrollToTop>
    </BrowserRouter>
  );
};
