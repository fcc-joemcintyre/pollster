import React, { Fragment, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
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

const AppBase = ({ themeName, authenticated, dispatch }) => {
  const [loading, setLoading] = useState (true);
  const [message, setMessage] = useState ('Loading ...');

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
  }, []);

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
              <Route exact path='/' component={HomePage} />
              <Route exact path='/register' component={RegisterPage} />
              <AuthRoute exact path='/profile' authenticated={authenticated} component={ProfilePage} />
              <Route exact path='/polls/:_id' component={PollPage} />
              <AuthRoute exact path='/manage' authenticated={authenticated} component={ManagePage} />
              <AuthRoute exact path='/results' authenticated={authenticated} component={ResultPage} />
              <Route exact path='/about' component={AboutPage} />
              <Route exact path='/logout' component={LogoutPage} />
              <Route path='*' component={NotFoundPage} />
            </Switch>
          </Fragment>
        </ThemeProvider>
      </ScrollToTop>
    </BrowserRouter>
  );
};


const mapStateToProps = ({ user }) => ({
  authenticated: user.authenticated,
  themeName: user.theme || 'base',
});

export const App = connect (mapStateToProps) (AppBase);

AppBase.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  themeName: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};
