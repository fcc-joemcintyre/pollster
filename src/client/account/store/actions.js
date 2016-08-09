import 'whatwg-fetch';
import { SET_AUTHENTICATED, SET_PROFILE } from './constants';

export function register (username, password) {
  return () => {
    return new Promise ((resolve, reject) => {
      const data = { username, password };
      fetch (`${location.origin}/api/register`, {
        method: 'post',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        },
        credentials: 'same-origin',
        body: JSON.stringify (data),
      }).then (res => {
        if (!res.ok) {
          reject (res.statusText);
        } else {
          resolve ();
        }
      })
      .catch (err => {
        reject (err);
      });
    });
  };
}

export function login (username, password) {
  return dispatch => {
    return new Promise ((resolve, reject) => {
      const data = { username, password };
      fetch (`${location.origin}/api/login`, {
        method: 'post',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        },
        credentials: 'same-origin',
        body: JSON.stringify (data),
      }).then (res => {
        if (!res.ok) {
          return reject (res.statusText);
        } else {
          return res.json ();
        }
      }).then (user => {
        dispatch (setAuthenticated (true, user.username));
        dispatch (setProfile (user.name, user.email));
        return resolve ();
      }).catch (err => {
        return reject (err);
      });
    });
  };
}

export function logout () {
  return dispatch => {
    return new Promise ((resolve, reject) => {
      fetch (`${location.origin}/api/logout`, {
        method: 'post',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        },
        credentials: 'same-origin',
      }).then (() => {
        dispatch (setAuthenticated (false, ''));
        return resolve ();
      }).catch (err => {
        dispatch (setAuthenticated (false, ''));
        return reject (err);
      });
    });
  };
}

export function verifyLogin () {
  return dispatch => {
    return new Promise ((resolve, reject) => {
      fetch (`${location.origin}/api/verifylogin`, {
        method: 'get',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        },
        credentials: 'same-origin',
      }).then (res => {
        if (!res.ok) {
          return reject (res.statusText);
        } else {
          return res.json ();
        }
      }).then (data => {
        if (data.authenticated) {
          dispatch (setAuthenticated (true, data.user.username));
          dispatch (setProfile (data.user.name, data.user.email));
          return resolve (true);
        } else {
          dispatch (setAuthenticated (false, ''));
          dispatch (setProfile ('', ''));
          return resolve (false);
        }
      }).catch (err => {
        return reject (err);
      });
    });
  };
}

export function setAuthenticated (authenticated, username) {
  return { type: SET_AUTHENTICATED, authenticated, username };
}

export function updateProfile (name, email) {
  return dispatch => {
    return new Promise ((resolve, reject) => {
      const data = { name, email };
      fetch (`${location.origin}/api/profile`, {
        method: 'post',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
        },
        credentials: 'same-origin',
        body: JSON.stringify (data),
      }).then (res => {
        if (!res.ok) {
          return reject (res.statusCode);
        } else {
          dispatch (setProfile (name, email));
          return resolve ();
        }
      }).catch (err => {
        return reject (err);
      });
    });
  };
}

export function setProfile (name, email) {
  return { type: SET_PROFILE, name, email };
}
