// @ts-check
import passport from 'passport';
import * as db from '../db/users.js';
import { validateLogin, validateRegister, validateProfile } from './validators.js';

/**
  @typedef { import ('express').Request} Request
  @typedef { import ('express').Response} Response
  @typedef { import ('express').NextFunction} NextFunction
*/

/**
 * Login, authenticating user and creating a session
 * @param {Request} req Request
 * @param {Response} res Response
 *  200 logged in, data { user, theme }
 *  400 error data {}
 *  401 unauthorized data {}
 * @param {NextFunction} next Next middleware
 * @returns {void}
 */
export function login (req, res, next) {
  console.log ('INFO login');
  if (validateLogin (req.body) === false) {
    console.log ('ERROR login (400) invalid body', validateLogin.errors);
    res.status (400).json ({});
  } else {
    passport.authenticate ('local', (err, user) => {
      if (err) {
        return next (err);
      }
      // if not a valid user, return 401 auth error
      if (!user) {
        console.log ('ERROR login (401) unauthenticated');
        return res.status (401).json ({});
      }
      return req.login (user, (err2) => {
        if (err2) {
          return next (err2);
        }
        console.log ('INFO login ok', user.email);
        const { key, theme } = req.user;
        return res.status (200).json ({ key, theme });
      });
    }) (req, res, next);
  }
}

/**
 * Logout, closing session
 * @param {Request} req Request
 * @param {Response} res Response
 *  200 logged out, data {}
 * @returns {void}
 */
export function logout (req, res) {
  console.log ('INFO logout', req.user?.key || 0);
  req.logout ();
  res.status (200).json ({});
}

/**
 * If already logged in, return user information and continue session
 * @param {Request} req Request
 * @param {Response} res Response
 *  200 user info {user, theme} with defaults if not logged in
 * @returns {void}
 */
export function verifyLogin (req, res) {
  console.log ('INFO verifyLogin');
  if (req.isAuthenticated ()) {
    const { key, theme } = req.user;
    res.status (200).json ({ key, theme });
    console.log ('INFO verified', req.user.key);
  } else {
    console.log ('INFO not verified');
    res.status (200).json ({ key: 0 });
  }
}

/**
 * Register new user
 * @param {Request} req Request
 * @param {Response} res Response
 *  200 user registered, data {}
 *  409 user already exists, data {}
 * @returns {Promise<void>} Promise with no value
 */
export async function register (req, res) {
  console.log ('INFO register');
  if (validateRegister (req.body) === false) {
    console.log ('ERROR register (400) invalid body', validateRegister.errors);
    res.status (400).json ({});
  } else {
    const { email, name, password } = req.body;
    const t = await db.registerUser (email, name, password);
    if (t.status === 200) {
      console.log ('INFO register ok', req.body.email);
      res.status (200).json ({});
    } else {
      console.log (`ERROR register ${t.status}`);
      res.status (t.status).json ({});
    }
  }
}

/**
 * Get user profile
 * @param {Request} req Request
 * @param {Response} res Response
 *  200, data {name, email, theme}
 * @returns {Promise<void>} Promise with no data
 */
export async function getProfile (req, res) {
  console.log ('INFO getProfile');
  const t = await db.getProfile (req.user.key);
  if (t.status === 200 && t.user) {
    const { name, theme } = t.user;
    res.status (200).json ({ name, theme });
  } else {
    console.log (`ERROR getProfile ${t.status}`);
    res.status (t.status).json ({});
  }
}

/**
 * Update user profile
 * @param {Request} req Request
 * @param {Response} res Response
 *  200, data {name, email, theme}
 * @returns {Promise<void>} Promise with no data
 */
export async function updateProfile (req, res) {
  console.log ('INFO updateProfile');
  if (validateProfile (req.body) === false) {
    console.log ('ERROR updateProfile (400) invalid body', validateProfile.errors);
    res.status (400).json ({});
  } else {
    const { name, theme } = req.body;
    const t = await db.updateProfile (req.user.key, name, theme);
    if (t.status === 200) {
      res.status (200).json ({ name, theme });
    } else {
      console.log (`ERROR updateProfile (${t.status})`);
      res.status (t.status).json ({});
    }
  }
}
