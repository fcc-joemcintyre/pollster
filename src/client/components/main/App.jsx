import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { baseTheme, grayTheme } from '../style/theme';
import AuthRoute from './AuthRoute.jsx';
import Header from './Header.jsx';
import { verifyLogin } from '../../store/userActions';
import { initPolls } from '../../store/pollsActions';
import '../style/Global';
import { Page } from '../style/Page';
import ScrollToTop from '../ui/ScrollToTop.jsx';

import LoadingPage from './LoadingPage.jsx';
import HomePage from '../app/HomePage.jsx';
import RegisterPage from '../user/RegisterPage.jsx';
import LoginPage from '../user/LoginPage.jsx';
import ProfilePage from '../user/ProfilePage.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import PollPage from '../app/PollPage.jsx';
import ManagePage from '../app/ManagePage.jsx';
import ResultPage from '../app/ResultPage.jsx';
import AboutPage from '../app/AboutPage.jsx';
import LogoutPage from '../app/LogoutPage.jsx';

// main class for application
class App extends Component {
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
      this.setState (() => { return { loading: false, message: '' }; });
    } catch (err) {
      this.setState (() => { return { loading: false, message: 'Network error, try again.' }; });
    }
  }

  render () {
    if (this.state.loading) {
      return (
        <Page>
          <LoadingPage message={this.state.message} />
        </Page>
      );
    }
    const theme = (this.props.theme === 'gray') ? grayTheme : baseTheme;
    const { authenticated } = this.props;
    return (
      <BrowserRouter>
        <ScrollToTop>
          <ThemeProvider theme={theme}>
            <Page>
              <Header />
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

const mapStateToProps = ({ user }) => {
  return ({
    authenticated: user.authenticated,
    theme: user.theme || 'base',
  });
};

export default connect (mapStateToProps) (App);

App.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  theme: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};
