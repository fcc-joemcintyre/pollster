import { SET_AUTHENTICATED, SET_PROFILE } from './constants';
import request from 'request';

export function register (username, password) {
  return dispatch => {
    return new Promise ((resolve, reject) => {
      let form = { form: {username: username, password: password}};
      request.post (location.origin + '/api/register', form, (err, res, body) => {
        if (err) {
          reject (err);
        } else if (res.statusCode !== 200) {
          reject (res.statusCode);
        } else {
          resolve ();
        }
      });
    });
  };
}

export function login (username, password) {
  return dispatch => {
    return new Promise ((resolve, reject) => {
      let form = { form: {username: username, password: password}};
      request.post (location.origin + '/api/login', form, (err, res, body) => {
        if (err) {
          reject (err);
        } else if (res.statusCode !== 200) {
          reject (res.statusCode);
        } else {
          let user = JSON.parse (body);
          dispatch (setAuthenticated (true, user.username));
          dispatch (setProfile (user.name, user.email));
          resolve ();
        }
      });
    });
  };
}

export function logout () {
  return dispatch => {
    return new Promise ((resolve, reject) => {
      request.post (location.origin + '/api/logout', (err, res, body) => {
        dispatch (setAuthenticated (false, ''));
        if (err) {
          reject (err);
        } else if (res.statusCode !== 200) {
          reject (res.statusCode);
        } else {
          resolve ();
        }
      });
    });
  };
}

export function verifyLogin () {
  return dispatch => {
    return new Promise ((resolve, reject) => {
      request.get (location.origin + '/api/verifylogin', (err, res, body) => {
        if (err) {
          reject (err);
        } else if (res.statusCode !== 200) {
          reject (res.statusCode);
        } else {
          let login = JSON.parse (body);
          if (login.authenticated) {
            dispatch (setAuthenticated (true, login.user.username));
            dispatch (setProfile (login.user.name, login.user.email));
            resolve (true);
          } else {
            dispatch (setAuthenticated (false, ''));
            dispatch (setProfile ('', ''));
            resolve (false);
          }
        }
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
      request.post ({url: location.origin + '/api/profile', json: data}, (err, res, body) => {
        if (err) {
          reject (err);
        } else if (res.statusCode !== 200) {
          reject (res.statusCode);
        } else {
          dispatch (setProfile (name, email));
          resolve ();
        }
      });
    });
  };
}

export function setProfile (name, email) {
  return { type: SET_PROFILE, name, email};
}
