const requestBase = require ('request');
const url = require ('./test-main').url;

const request = requestBase.defaults ({ jar: true });

describe ('login/logout/register', function () {
  describe ('valid login request', function () {
    it ('should return valid login', function (done) {
      const form = { form: { username: 'amy', password: 'test' } };
      request.post (`${url}api/login`, form, (err, res) => {
        if (err) { return done (err); }
        if (res.statusCode === 200) {
          return done ();
        }
        return done (new Error (`Invalid status code ${res.statusCode}`));
      });
    });
  });

  describe ('invalid login request', function () {
    it ('should return 401 error', function (done) {
      const form = { form: { username: 'notauser', password: 'test' } };
      request.post (`${url}api/login`, form, (err, res) => {
        if (err) { return done (err); }
        if (res.statusCode === 401) {
          return done ();
        }
        return done (new Error (`Invalid status code ${res.statusCode}`));
      });
    });
  });

  describe ('valid login and logout request', function () {
    it ('should have no errors', function (done) {
      const form = { form: { username: 'amy', password: 'test' } };
      request.post (`${url}api/login`, form, (err, res) => {
        if (err) { return done (err); }
        if (res.statusCode === 200) {
          return request.post (`${url}api/logout`, function (err2, res2) {
            if (res2.statusCode === 200) {
              return done ();
            } else {
              return done (new Error (`Invalid logout status code ${res2.statusCode}`));
            }
          });
        } else {
          return done (new Error (`Invalid login status code ${res.statusCode}`));
        }
      });
    });
  });

  describe ('check authentication for logged in user', function () {
    before (function (done) {
      const form = { form: { username: 'amy', password: 'test' } };
      request.post (`${url}api/login`, form, (err, res) => {
        if (err) { return done (err); }
        if (res.statusCode === 200) {
          return done ();
        } else {
          return done (new Error (`Invalid status code ${res.statusCode}`));
        }
      });
    });

    after (function (done) {
      request.post (`${url}api/logout`, () => {
        done ();
      });
    });

    it ('should have no errors', function (done) {
      request.get ({ url: `${url}api/verifylogin` }, (err, res, body) => {
        if (err) { return done (err); }
        if (res.statusCode === 200) {
          const data = JSON.parse (body);
          if (data.authenticated === true) {
            return done ();
          } else {
            return done (new Error (`Invalid data ${JSON.stringify (data)}`));
          }
        } else {
          return done (new Error (`Invalid status code ${res.statusCode}`));
        }
      });
    });
  });

  describe ('check authentication for no logged in user', function () {
    it ('should return false with no errors', function (done) {
      request.get (`${url}api/verifylogin`, (err, res, body) => {
        if (res.statusCode === 200) {
          const data = JSON.parse (body);
          if (data.authenticated === false) {
            return done ();
          } else {
            return done (new Error (`Invalid response ${JSON.stringify (data)}`));
          }
        } else {
          return done (new Error (`Invalid authenticated status code ${res.statusCode}`));
        }
      });
    });
  });

  describe ('register, login and logout', function () {
    it ('should have no errors', function (done) {
      const form = { form: { username: 'newuser', password: 'test' } };
      request.post (`${url}api/register`, form, (err, res) => {
        if (err) { return done (err); }
        if (res.statusCode === 200) {
          const form2 = { form: { username: 'newuser', password: 'test' } };
          return request.post (`${url}api/login`, form2, (err2, res2) => {
            if (err2) { return done (err2); }
            if (res2.statusCode === 200) {
              return request.post (`${url}api/logout`, (err3, res3) => {
                if (res3.statusCode === 200) {
                  return done ();
                } else {
                  return done (new Error (`Invalid response logout ${res3.statusCode}`));
                }
              });
            } else {
              return done (new Error (`Invalid login status code ${res2.statusCode}`));
            }
          });
        } else {
          return done (new Error (`Invalid register status code ${res.statusCode}`));
        }
      });
    });
  });

  describe ('register same user twice', function () {
    it ('should fail on second register call', function (done) {
      const form = { form: { username: 'newuser2', password: 'test' } };
      request.post (`${url}api/register`, form, (err, res) => {
        if (err) { return done (err); }
        if (res.statusCode === 200) {
          return request.post (`${url}api/register`, form, (err2, res2) => {
            if (err2) { return done (err2); }
            if (res2.statusCode === 403) {
              return done ();
            }
            return done (new Error (`Invalid response logout 2 ${res2.statusCode}`));
          });
        } else {
          return done (new Error (`Invalid response logout 1 ${res.statusCode}`));
        }
      });
    });
  });
});

describe ('profile', function () {
  beforeEach (function (done) {
    const form = { form: { username: 'amy', password: 'test' } };
    request.post (`${url}api/login`, form, (err, res) => {
      if (err) { return done (err); }
      if (res.statusCode === 200) {
        return done ();
      } else {
        return done (new Error (`Invalid status code ${res.statusCode}`));
      }
    });
  });

  afterEach (function (done) {
    request.post (`${url}api/logout`, () => {
      done ();
    });
  });

  describe ('get initial profile', function () {
    it ('should have no errors', function (done) {
      request.get ({ url: `${url}api/profile` }, (err, res, body) => {
        if (err) { return done (err); }
        if (res.statusCode === 200) {
          const data = JSON.parse (body);
          if ((data.name === '') && (data.email === '')) {
            return done ();
          } else {
            return done (new Error (`Invalid data ${JSON.stringify (data)}`));
          }
        } else {
          return done (new Error (`Invalid status code ${res.statusCode}`));
        }
      });
    });
  });

  describe ('update profile', function () {
    it ('should have no errors', function (done) {
      const form = { name: 'Test', email: 'test@example.com' };
      request.post ({ url: `${url}api/profile`, form }, (err, res) => {
        if (err) { return done (err); }
        if (res.statusCode === 200) {
          return request.get ({ url: `${url}api/profile` }, (err2, res2, body2) => {
            if (err2) { return done (err2); }
            if (res2.statusCode === 200) {
              const data = JSON.parse (body2);
              if ((data.name === 'Test') && (data.email === 'test@example.com')) {
                return done ();
              } else {
                return done (new Error (`Invalid data ${JSON.stringify (data)}`));
              }
            } else {
              return done (new Error (`Invalid register status code ${res2.statusCode}`));
            }
          });
        } else {
          return done (new Error (`Invalid status code ${res.statusCode}`));
        }
      });
    });
  });
});

describe ('REST call validation', function () {
  describe ('login: missing body', function () {
    it ('should fail with 400', function (done) {
      request.post (`${url}api/login`, { form: {} }, (err, res) => {
        if (err) { return done (err); }
        if (res.statusCode === 400) {
          return done ();
        }
        return done (new Error (`Invalid statusCode ${res.statusCode}`));
      });
    });
  });

  describe ('Login: missing username', function () {
    it ('should fail with 400', function (done) {
      request.post (`${url}api/login`, { form: { password: 'password' } }, (err, res) => {
        if (err) { return done (err); }
        if (res.statusCode === 400) {
          return done ();
        }
        return done (new Error (`Invalid statusCode ${res.statusCode}`));
      });
    });
  });

  describe ('login: missing password', function () {
    it ('should fail with 400', function (done) {
      request.post (`${url}api/login`, { form: { username: 'username' } }, (err, res) => {
        if (err) { return done (err); }
        if (res.statusCode === 400) {
          return done ();
        }
        return done (new Error (`Invalid statusCode ${res.statusCode}`));
      });
    });
  });

  describe ('login: extraneous data', function () {
    it ('should fail with 400', function (done) {
      request.post (`${url}api/login`, { form: { username: 'username', password: 'password', extra: 'extra' } }, (err, res) => {
        if (err) { return done (err); }
        if (res.statusCode === 400) {
          return done ();
        }
        return done (new Error (`Invalid statusCode ${res.statusCode}`));
      });
    });
  });

  describe ('login: invalid username length', function () {
    it ('should fail with 400', function (done) {
      request.post (`${url}api/login`, { form: { username: 'usernameIsOver20Length', password: 'password' } }, (err, res) => {
        if (err) { return done (err); }
        if (res.statusCode === 400) {
          return done ();
        }
        return done (new Error (`Invalid statusCode ${res.statusCode}`));
      });
    });
  });

  describe ('login: invalid password length', function () {
    it ('should fail with 400', function (done) {
      request.post (`${url}api/login`, { form: { username: 'username', password: 'passwordIsOver20Length' } }, (err, res) => {
        if (err) { return done (err); }
        if (res.statusCode === 400) {
          return done ();
        }
        return done (new Error (`Invalid statusCode ${res.statusCode}`));
      });
    });
  });

  describe ('register: missing body', function () {
    it ('should fail with 400', function (done) {
      request.post (`${url}api/register`, (err, res) => {
        if (err) { return done (err); }
        if (res.statusCode === 400) {
          return done ();
        }
        return done (new Error (`Invalid statusCode ${res.statusCode}`));
      });
    });
  });

  describe ('register: missing username', function () {
    it ('should fail with 400', function (done) {
      request.post (`${url}api/register`, { form: { password: 'password' } }, (err, res) => {
        if (err) { return done (err); }
        if (res.statusCode === 400) {
          return done ();
        }
        return done (new Error (`Invalid statusCode ${res.statusCode}`));
      });
    });
  });

  describe ('register: missing password', function () {
    it ('should fail with 400', function (done) {
      request.post (`${url}api/register`, { form: { username: 'username' } }, (err, res) => {
        if (err) { return done (err); }
        if (res.statusCode === 400) {
          return done ();
        }
        return done (new Error (`Invalid statusCode ${res.statusCode}`));
      });
    });
  });

  describe ('register: extraneous data', function () {
    it ('should fail with 400', function (done) {
      request.post (`${url}api/register`, { form: { username: 'username', password: 'password', extra: 'extra' } }, (err, res) => {
        if (err) { return done (err); }
        if (res.statusCode === 400) {
          return done ();
        }
        return done (new Error (`Invalid statusCode ${res.statusCode}`));
      });
    });
  });

  describe ('register: invalid username length', function () {
    it ('should fail with 400', function (done) {
      request.post (`${url}api/register`, { form: { username: 'usernameIsOver20Length', password: 'password' } }, (err, res) => {
        if (err) { return done (err); }
        if (res.statusCode === 400) {
          return done ();
        }
        return done (new Error (`Invalid statusCode ${res.statusCode}`));
      });
    });
  });

  describe ('register: invalid password length', function () {
    it ('should fail with 400', function (done) {
      request.post (`${url}api/register`, { form: { username: 'username', password: 'passwordIsOver20Length' } }, (err, res) => {
        if (err) { return done (err); }
        if (res.statusCode === 400) {
          return done ();
        }
        return done (new Error (`Invalid statusCode ${res.statusCode}`));
      });
    });
  });
});
