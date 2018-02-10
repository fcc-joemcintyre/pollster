/*
  User action creators
*/
import { SET_AUTHENTICATED, SET_PROFILE } from './userConstants';
import API from './API';

export function register (username, password) {
  return () => API.register (username, password);
}

export function login (username, password) {
  return async (dispatch) => {
    try {
      const user = await API.login (username, password);
      dispatch (setAuthenticated (true, user.username));
      dispatch (setProfile (user.name, user.email, user.theme));
    } catch (err) {
      throw err;
    }
  };
}

export function logout () {
  return async (dispatch) => {
    dispatch (setAuthenticated (false, ''));
    try {
      await API.logout ();
    } catch (err) {
      // ignore error
    }
  };
}

export function verifyLogin () {
  return async (dispatch) => {
    try {
      const data = await API.verifyLogin ();
      if (data.authenticated) {
        dispatch (setAuthenticated (true, data.user.username));
        dispatch (setProfile (data.user.name, data.user.email, data.user.theme));
        return true;
      } else {
        dispatch (setAuthenticated (false, ''));
        dispatch (setProfile ('', '', 'base'));
        return false;
      }
    } catch (err) {
      throw err;
    }
  };
}

export function setAuthenticated (authenticated, username) {
  return { type: SET_AUTHENTICATED, authenticated, username };
}

export function updateProfile (name, email, theme) {
  return async (dispatch) => {
    try {
      await API.updateProfile (name, email, theme);
      dispatch (setProfile (name, email, theme));
    } catch (err) {
      throw err;
    }
  };
}

export function setProfile (name, email, theme) {
  return { type: SET_PROFILE, name, email, theme };
}
