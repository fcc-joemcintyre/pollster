import { Application, NextFunction, Request, Response } from 'express';
import { getProfile, login, logout, register, updateProfile, verifyLogin } from './listener/user.js';
import { createPoll, deletePoll, getPoll, getPolls, updatePoll, vote } from './listener/app.js';

/**
 * Initialize routes.
 * @param app Express app object
 */
export function initRoutes (app: Application): void {
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
 * @param req Request
 * @param res Response
 * @param next Next middleware
 */
function isAuthenticated (req: Request, res: Response, next: NextFunction): void {
  if (req.isAuthenticated ()) {
    next ();
  } else {
    res.status (401).json ({});
  }
}
