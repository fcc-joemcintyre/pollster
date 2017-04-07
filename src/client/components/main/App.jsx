import 'babel-polyfill';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import AuthRoute from './AuthRoute.jsx';
import Header from './Header.jsx';
import { verifyLogin } from '../../store/userActions';
import { initPolls } from '../../store/pollsActions';
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

// main class for application
class App extends Component {
  constructor (props) {
    super (props);
    this.state = {
      loading: true,
      message: 'Loading ...',
    };
  }

  componentDidMount () {
    Promise.resolve ().then (() => {
      return this.props.dispatch (verifyLogin ());
    }).then (() => {
      return this.props.dispatch (initPolls ());
    }).then (() => {
      this.setState (() => { return { loading: false, message: '' }; });
    }).catch (() => {
      this.setState (() => { return { loading: false, message: 'Network error, try again.' }; });
    });
  }

  render () {
    if (this.state.loading) {
      return <LoadingPage message={this.state.message} />;
    }

    return (
      <BrowserRouter>
        <ScrollToTop>
          <div className='app-page'>
            <Header />
            <div className='app-page-contentArea'>
              <Switch>
                <Route exact path='/' component={HomePage} />
                <Route path='/register' component={RegisterPage} />
                <Route path='/login' component={LoginPage} />
                <AuthRoute path='/profile' authenticated={this.props.authenticated} component={ProfilePage} />
                <Route path='/polls/:_id' component={PollPage} />
                <AuthRoute path='/manage' authenticated={this.props.authenticated} component={ManagePage} />
                <AuthRoute path='/results' authenticated={this.props.authenticated} component={ResultPage} />
                <Route path='/about' component={AboutPage} />
                <Route path='*' component={NotFoundPage} />
              </Switch>
            </div>
          </div>
        </ScrollToTop>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = ({ user }) => {
  return ({
    authenticated: user.authenticated,
  });
};

export default connect (mapStateToProps) (App);

App.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
};
