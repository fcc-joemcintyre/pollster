const passport = require ('passport');
const db = require ('./db');

// Initialize listeners (currently empty)
function init () {
}

// Login, authenticating user and creating a session
function login (req, res, next) {
  console.log ('login');
  if (!(req.body && req.body.username && req.body.password)) {
    console.log ('login', '(400) invalid login body', JSON.stringify (req.body));
    res.status (400).json ({});
  } else {
    passport.authenticate ('local', (err, user) => {
      if (err) {
        return next (err);
      }
      // if not a valid user, return 401 auth error
      if (!user) {
        console.log ('  login', '(401) unauthenticated');
        return res.status (401).json ({});
      }
      return req.login (user, (err2) => {
        if (err2) {
          return next (err2);
        }
        console.log ('  login', user.username);
        const result = {
          username: user.username,
          name: req.user.name,
          email: req.user.email,
        };
        return res.status (200).json (result);
      });
    })(req, res, next);
  }
}

// logout, closing session
function logout (req, res) {
  if (req.user) {
    console.log ('logout', req.user.username);
  }
  req.logout ();
  res.status (200).json ({});
}

// if already logged in, return user information
// allows continuation of session
function verifyLogin (req, res) {
  console.log ('verifyLogin');
  let message = { authenticated: false, user: null };
  if (req.isAuthenticated ()) {
    message = {
      authenticated: true,
      user: {
        username: req.user.username,
        name: req.user.name,
        email: req.user.email,
      },
    };
    console.log ('  verified', req.user.username);
  } else {
    console.log ('  not verified (no username)');
  }
  res.status (200).json (message);
}

// register new user. If already existing user, return 403 (Forbidden)
function register (req, res) {
  console.log ('register');
  if (!(req.body && req.body.username && req.body.password)) {
    console.log ('register', '(400) invalid login body', JSON.stringify (req.body));
    res.status (400).json ({});
  } else {
    db.insertUser (req.body.username, req.body.password)
    .then (() => {
      console.log ('  registered', req.body.username);
      res.status (200).json ({});
    })
    .catch (err => {
      console.log ('  error', err);
      res.status (403).json ({});
    });
  }
}

function getProfile (req, res) {
  console.log ('getProfile', req.user.username);
  res.status (200).json ({
    name: req.user.name,
    email: req.user.email,
  });
}

function updateProfile (req, res) {
  console.log ('updateProfile', req.user.username, req.body.name, req.body.email);
  db.updateUser (req.user.username, req.body.name, req.body.email)
  .then (() => {
    console.log ('  update successful');
    res.status (200).json ({});
  })
  .catch (err => {
    console.log ('  error (500)', err);
    res.status (500).json ({});
  });
}

exports.init = init;
exports.login = login;
exports.logout = logout;
exports.verifyLogin = verifyLogin;
exports.register = register;
exports.getProfile = getProfile;
exports.updateProfile = updateProfile;
