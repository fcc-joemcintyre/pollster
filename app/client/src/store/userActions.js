import { get, post } from './util/jsonFetch';
import { SET_AUTHENTICATED, SET_PROFILE } from './userConstants';

export function register (email, password) {
  return () => post ('/api/register', { email, password });
}

export function login (email, password) {
  return async (dispatch) => {
    const user = await post ('/api/login', { email, password });
    dispatch (setAuthenticated (true, user.key));
  };
}

export function logout () {
  return async (dispatch) => {
    dispatch (setAuthenticated (false, 0));
    try {
      await post ('/api/logout');
    } catch (err) {
      // ignore error
    }
  };
}

export function verifyLogin () {
  return async (dispatch) => {
    const user = await get ('/api/verifylogin');
    if (user.key > 0) {
      dispatch (setAuthenticated (true, user.key));
      return true;
    } else {
      dispatch (setAuthenticated (false, 0));
      return false;
    }
  };
}

export function setAuthenticated (authenticated, key) {
  return { type: SET_AUTHENTICATED, authenticated, key };
}

export function updateProfile (name, theme) {
  return async (dispatch) => {
    await post ('/api/profile', { name, theme });
    dispatch (setProfile (name, theme));
  };
}

export function setProfile (name, email, theme) {
  return { type: SET_PROFILE, name, theme };
}
