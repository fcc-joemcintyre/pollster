import passport from 'passport';
import passportLocal from 'passport-local';
import * as db from './db.js';
import * as hash from './hash.js';

const { Strategy } = passportLocal;

// Initialize authentication module, with serializer and desericalizer
export function init () {
  // local authentication using database for user registry
  passport.use (new Strategy (async (username, password, callback) => {
    try {
      const user = await db.findUserByUsername (username);
      if (!user) {
        return callback (null, false);
      }
      const passwordMatch = hash.compare (password, user.hash, user.salt);
      return callback (null, (passwordMatch) ? user : false);
    } catch (err) {
      return callback (err);
    }
  }));

  // set function to set username as key for serialization
  passport.serializeUser ((user, callback) => callback (null, user.username));

  // set function to get user from username
  passport.deserializeUser (async (username, callback) => {
    try {
      const user = await db.findUserByUsername (username);
      return callback (null, user);
    } catch (err) {
      return callback (err);
    }
  });
}
