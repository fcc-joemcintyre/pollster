import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { getTheme } from './theme';
import './Global';
import { AuthRoute } from './AuthRoute';
import { Header } from './Header';
import { verifyLogin } from '../../store/userActions';
import { initPolls } from '../../store/pollsActions';
import { Page } from '../../lib/Layout';
import { ScrollToTop } from '../../lib/ScrollToTop';

import { LoadingPage } from './LoadingPage';
import { HomePage } from '../HomePage';
import { LoginPage, RegisterPage, ProfilePage } from '../User';
import { NotFoundPage } from './NotFoundPage';
import { PollPage } from '../PollPage';
import { ManagePage } from '../ManagePage';
import { ResultPage } from '../ResultPage';
import { AboutPage } from '../AboutPage';
import { LogoutPage } from '../LogoutPage';

// main class for application
class AppBase extends Component {
  constructor (props) {
    super (props);
    this.state = {
      loading: true,
      message: 'Loading ...',
    };
  }

  async componentDidMount () {
    try {
      await this.props.dispatch (verifyLogin ());
      await this.props.dispatch (initPolls ());
      this.setState ({ loading: false, message: '' });
    } catch (err) {
      this.setState ({ loading: false, message: 'Network error, try again.' });
    }
  }

  render () {
    const theme = getTheme (this.props.theme);
    if (this.state.loading) {
      return (
        <ThemeProvider theme={theme}>
          <Page>
            <Header menu={false} />
            <LoadingPage message={this.state.message} />
          </Page>
        </ThemeProvider>
      );
    }
    const { authenticated } = this.props;
    return (
      <BrowserRouter>
        <ScrollToTop>
          <ThemeProvider theme={theme}>
            <Page>
              <Header menu />
              <Switch>
                <Route exact path='/' component={HomePage} />
                <Route path='/register' component={RegisterPage} />
                <Route path='/login' component={LoginPage} />
                <AuthRoute path='/profile' authenticated={authenticated} component={ProfilePage} />
                <Route path='/polls/:_id' component={PollPage} />
                <AuthRoute path='/manage' authenticated={authenticated} component={ManagePage} />
                <AuthRoute path='/results' authenticated={authenticated} component={ResultPage} />
                <Route path='/about' component={AboutPage} />
                <Route path='/logout' component={LogoutPage} />
                <Route path='*' component={NotFoundPage} />
              </Switch>
            </Page>
          </ThemeProvider>
        </ScrollToTop>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  authenticated: user.authenticated,
  theme: user.theme || 'base',
});

export const App = connect (mapStateToProps) (AppBase);

AppBase.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  theme: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};
