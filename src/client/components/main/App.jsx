import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Header from './Header.jsx';
import configureStore from '../../store/configureStore';
import { verifyLogin } from '../../store/userActions';
import { initPolls } from '../../store/pollsActions';

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
          <div className='app-page'>
            <Header loggedIn={this.state.authenticated} />
            <div className='app-page-contentArea'>
              <Switch>
                <Route exact path='/' component={HomePage} />
                <Route path='/register' component={RegisterPage} />
                <Route path='/login' component={LoginPage} />
                <Route path='/profile' component={ProfilePage} onEnter={requireAuth} />
                <Route path='/polls/:_id' component={PollPage} />
                <Route path='/manage' component={ManagePage} onEnter={requireAuth} />
                <Route path='/results' component={ResultPage} onEnter={requireAuth} />
                <Route path='/about' component={AboutPage} />
                <Route path='*' component={NotFoundPage} />
              </Switch>
            </div>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

// When a route requires an authenticated user, set onEnter to this
// method. If no authenticated user, change the route to the login
// route, then continue to the original route.
function requireAuth (nextState, replace) {
  if (store.getState ().user.authenticated === false) {
    replace ({
      pathname: '/login',
      state: {
        nextPathname: nextState.location.pathname,
      },
    });
  }
}
