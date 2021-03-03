// @ts-check
import passport from 'passport';
import passportLocal from 'passport-local';
import { findUserByUsername } from '../db.js';
import { compareHash } from './hash.js';

const { Strategy } = passportLocal;

/**
 * Initialize authentication module, with serializer and desericalizer
 * @returns {void}
 */
export function initAuth () {
  // local authentication using database for user registry
  passport.use (new Strategy (async (username, password, callback) => {
    try {
      const user = await findUserByUsername (username);
      if (!user) {
        return callback (null, false);
      }
      const passwordMatch = compareHash (password, user.hash, user.salt);
      return callback (null, (passwordMatch) ? user : false);
    } catch (err) {
      return callback (err);
    }
  }));

  // set function to set username as key for serialization
  // @ts-ignore (Express.User not modified)
  passport.serializeUser ((user, callback) => callback (null, user.username));

  // set function to get user from username
  passport.deserializeUser (async (username, callback) => {
    try {
      const user = await findUserByUsername (username);
      return callback (null, user);
    } catch (err) {
      return callback (err);
    }
  });
}
