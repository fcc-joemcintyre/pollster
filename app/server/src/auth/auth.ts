import passport from 'passport';
import passportLocal from 'passport-local';
import { findUserByEmail, User } from '../db/users.js';
import { compareHash } from './hash.js';

const { Strategy } = passportLocal;

/**
 * Initialize authentication module, with serializer and desericalizer
 */
export function initAuth (): void {
  // local authentication using database for user registry
  const options = { usernameField: 'email', passwordField: 'password' };
  passport.use (new Strategy (options, async (email, password, callback) => {
    try {
      const t = await findUserByEmail (email);
      if (t.status !== 200 || !t.user) {
        console.log ('ERROR auth (404)');
        return callback (null, false);
      }
      if (!compareHash (password, t.user.hash, t.user.salt)) {
        console.log ('ERROR auth (401)');
        return callback (null, false);
      }
      const { key, theme } = t.user;
      return callback (null, { key, theme });
    } catch (err) {
      return callback (err);
    }
  }));

  // serialize user
  passport.serializeUser ((user, callback) => callback (null, user));

  // deserialize user
  passport.deserializeUser ((user: User | false | undefined | null, callback) => (
    callback (null, user)
  ));
}
