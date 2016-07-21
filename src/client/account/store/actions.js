import { SET_AUTHENTICATED, SET_PROFILE } from './constants';
import 'whatwg-fetch';

export function register (username, password) {
  return dispatch => {
    return new Promise ((resolve, reject) => {
      let data = {username: username, password: password};
      fetch (location.origin + '/api/register', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        body: JSON.stringify (data)
      }).then (res => {
        if (! res.ok) {
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
      let data = {username: username, password: password};
      fetch (location.origin + '/api/login', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        body: JSON.stringify (data)
      }).then (res => {
        if (! res.ok) {
          reject (res.statusText);
        } else {
          return res.json ();
        }
      }).then (user => {
        dispatch (setAuthenticated (true, user.username));
        dispatch (setProfile (user.name, user.email));
        resolve ();
      }).catch (err => {
        reject (err);
      });
    });
  };
}

export function logout () {
  return dispatch => {
    return new Promise ((resolve, reject) => {
      fetch (location.origin + '/api/logout', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
      }).then (res => {
        dispatch (setAuthenticated (false, ''));
        resolve ();
      }).catch (err => {
        dispatch (setAuthenticated (false, ''));
        reject (err);
      });
    });
  };
}

export function verifyLogin () {
  return dispatch => {
    return new Promise ((resolve, reject) => {
      fetch (location.origin + '/api/verifylogin', {
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'same-origin'
      }).then (res => {
        if (! res.ok) {
          reject (res.statusText);
        } else {
          return res.json ();
        }
      }).then (login => {
        if (login.authenticated) {
          dispatch (setAuthenticated (true, login.user.username));
          dispatch (setProfile (login.user.name, login.user.email));
          resolve (true);
        } else {
          dispatch (setAuthenticated (false, ''));
          dispatch (setProfile ('', ''));
          resolve (false);
        }
      }).catch (err => {
        reject (err);
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
      let data = {
        name: name,
        email: email
      };
      fetch (location.origin + '/api/profile', {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        credentials: 'same-origin',
        body: JSON.stringify (data)
      }).then (res => {
        if (! res.ok) {
          reject (res.statusCode);
        } else {
          dispatch (setProfile (name, email));
          resolve ();
        }
      }).catch (err => {
        reject (err);
      });
    });
  };
}

export function setProfile (name, email) {
  return { type: SET_PROFILE, name, email};
}
