import { get, post } from './util/jsonFetch';
import { SET_AUTHENTICATED, SET_PROFILE } from './userConstants';

export function register (username, password) {
  return () => post ('/api/register', { username, password });
}

export function login (username, password) {
  return async (dispatch) => {
    const user = await post ('/api/login', { username, password });
    dispatch (setAuthenticated (true, user.username));
    dispatch (setProfile (user.name, user.email, user.theme));
  };
}

export function logout () {
  return async (dispatch) => {
    dispatch (setAuthenticated (false, ''));
    try {
      await post ('/api/logout');
    } catch (err) {
      // ignore error
    }
  };
}

export function verifyLogin () {
  return async (dispatch) => {
    const data = await get ('/api/verifylogin');
    if (data.authenticated) {
      dispatch (setAuthenticated (true, data.user.username));
      dispatch (setProfile (data.user.name, data.user.email, data.user.theme));
      return true;
    } else {
      dispatch (setAuthenticated (false, ''));
      dispatch (setProfile ('', '', 'base'));
      return false;
    }
  };
}

export function setAuthenticated (authenticated, username) {
  return { type: SET_AUTHENTICATED, authenticated, username };
}

export function updateProfile (name, email, theme) {
  return async (dispatch) => {
    await post ('/api/profile', { name, email, theme });
    dispatch (setProfile (name, email, theme));
  };
}

export function setProfile (name, email, theme) {
  return { type: SET_PROFILE, name, email, theme };
}
