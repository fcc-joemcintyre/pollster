/*
  User action creators
*/
/* eslint no-useless-return: off */
import { SET_AUTHENTICATED, SET_PROFILE } from './userConstants';
import API from './API';

export function register (username, password) {
  return () => {
    return API.register (username, password);
  };
}

export function login (username, password) {
  return (dispatch) => {
    return API.login (username, password).then ((user) => {
      dispatch (setAuthenticated (true, user.username));
      dispatch (setProfile (user.name, user.email));
      return;
    }).catch ((err) => {
      throw err;
    });
  };
}

export function logout () {
  return (dispatch) => {
    dispatch (setAuthenticated (false, ''));
    return API.logout ().then (() => {
      return;
    }).catch (() => {
      return;
    });
  };
}

export function verifyLogin () {
  return (dispatch) => {
    return API.verifyLogin ().then ((data) => {
      if (data.authenticated) {
        dispatch (setAuthenticated (true, data.user.username));
        dispatch (setProfile (data.user.name, data.user.email));
        return true;
      } else {
        dispatch (setAuthenticated (false, ''));
        dispatch (setProfile ('', ''));
        return false;
      }
    }).catch ((err) => {
      throw err;
    });
  };
}

export function setAuthenticated (authenticated, username) {
  return { type: SET_AUTHENTICATED, authenticated, username };
}

export function updateProfile (name, email) {
  return (dispatch) => {
    return API.updateProfile (name, email).then (() => {
      dispatch (setProfile (name, email));
      return;
    }).catch ((err) => {
      throw err;
    });
  };
}

export function setProfile (name, email) {
  return { type: SET_PROFILE, name, email };
}
