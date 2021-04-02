// @ts-check
import { getProfile, login, logout, register, updateProfile, verifyLogin } from './listener/user.js';
import { createPoll, deletePoll, getPoll, getPolls, updatePoll, vote } from './listener/app.js';

/**
  @typedef { import ('express').Application} Application
  @typedef { import ('express').Request} Request
  @typedef { import ('express').Response} Response
  @typedef { import ('express').NextFunction} NextFunction
*/

/**
 * Initialize routes.
 * @param {Application} app Express app object
 * @returns {void}
 */
export function initRoutes (app) {
  app.post ('/api/login', login);
  app.post ('/api/logout', logout);
  app.get ('/api/verifylogin', verifyLogin);
  app.post ('/api/register', register);
  app.get ('/api/profile', isAuthenticated, getProfile);
  app.post ('/api/profile', isAuthenticated, updateProfile);
  app.get ('/api/polls/:key', getPoll);
  app.get ('/api/polls', getPolls);
  app.post ('/api/polls/:key/votes/:choice', vote);
  app.post ('/api/polls/:key', isAuthenticated, updatePoll);
  app.post ('/api/polls', isAuthenticated, createPoll);
  app.delete ('/api/polls/:key', isAuthenticated, deletePoll);
}

/**
 * Authenticate, if passing continue, otherwise return 401 (auth failure)
 * @param {Request} req Request
 * @param {Response} res Response
 * @param {NextFunction} next Next middleware
 * @returns {void}
 */
function isAuthenticated (req, res, next) {
  if (req.isAuthenticated ()) {
    next ();
  } else {
    res.status (401).json ({});
  }
}
