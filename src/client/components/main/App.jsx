import 'babel-polyfill';
import React, { PropTypes } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import Header from './Header.jsx';
import configureStore from '../../store/configureStore';
import { verifyLogin } from '../../store/userActions';
import { initPolls } from '../../store/pollsActions';
import ScrollToTop from '../ui/ScrollToTop.jsx';

import HomePage from '../app/HomePage.jsx';
import RegisterPage from '../user/RegisterPage.jsx';
import LoginPage from '../user/LoginPage.jsx';
import ProfilePage from '../user/ProfilePage.jsx';
import NotFoundPage from './NotFoundPage.jsx';
import PollPage from '../app/PollPage.jsx';
import ManagePage from '../app/ManagePage.jsx';
import ResultPage from '../app/ResultPage.jsx';
import AboutPage from '../app/AboutPage.jsx';

// initialize store
const store = configureStore ();
store.dispatch (verifyLogin ())
.then (() => {
  store.dispatch (initPolls ())
  .then (() => {
    render (<App />, document.getElementById ('app'));
  });
});

// main class for application
export default class App extends React.Component {
  constructor (props) {
    super (props);
    this.state = {
      authenticated: store.getState ().user.authenticated,
    };
  }

  // on mount, subscribe to listen for authentication status changes
  componentWillMount () {
    this.unsubscribe = store.subscribe (() => {
      const authenticated = store.getState ().user.authenticated;
      if (this.state.authenticated !== authenticated) {
        this.setState ({ authenticated });
      }
    });
  }

  // before unmount, remove store listener
  componentWillUnmount () {
    this.unsubscribe ();
  }

  // set up store top level element and header for all pages
  render () {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <ScrollToTop>
            <div className='app-page'>
              <Header loggedIn={this.state.authenticated} />
              <div className='app-page-contentArea'>
                <Switch>
                  <Route exact path='/' component={HomePage} />
                  <Route path='/register' component={RegisterPage} />
                  <Route path='/login' component={LoginPage} />
                  <RouteUser path='/profile' component={ProfilePage} />
                  <Route path='/polls/:_id' component={PollPage} />
                  <RouteUser path='/manage' component={ManagePage} />
                  <RouteUser path='/results' component={ResultPage} />
                  <Route path='/about' component={AboutPage} />
                  <Route path='*' component={NotFoundPage} />
                </Switch>
              </div>
            </div>
          </ScrollToTop>
        </BrowserRouter>
      </Provider>
    );
  }
}

const RouteUser = ({ component, ...rest }) => {
  return (<Route
    {...rest} render={(props) => {
      if (store.getState ().user.authenticated) {
        return React.createElement (component, props);
      } else {
        return (<Redirect
          to={{
            pathname: '/login',
            state: { from: props.location },
          }}
        />);
      }
    }}
  />);
};

RouteUser.propTypes = {
  component: PropTypes.func.isRequired,
  location: PropTypes.shape ({}),
};
