import * as listenerUser from './listenerUser.js';
import * as listenerApp from './listenerApp.js';

// Initialize routes.
export function init (app) {
  listenerUser.init ();
  listenerApp.init ();

  app.post ('/api/login', listenerUser.login);
  app.post ('/api/logout', listenerUser.logout);
  app.get ('/api/verifylogin', listenerUser.verifyLogin);
  app.post ('/api/register', listenerUser.register);
  app.get ('/api/profile', isAuthenticated, listenerUser.getProfile);
  app.post ('/api/profile', isAuthenticated, listenerUser.updateProfile);
  app.get ('/api/polls', listenerApp.getPolls);
  app.get ('/api/polls/:_id', isAuthenticated, listenerApp.getPoll);
  app.post ('/api/polls', isAuthenticated, listenerApp.addPoll);
  app.post ('/api/polls/:_id', isAuthenticated, listenerApp.updatePoll);
  app.delete ('/api/polls/:_id', isAuthenticated, listenerApp.deletePoll);
  app.post ('/api/polls/:_id/votes/:choice', listenerApp.vote);
}

// authenticate, if passing continue, otherwise return 401 (auth failure)
function isAuthenticated (req, res, next) {
  console.log ('isAuthenticated', req.path);
  if (req.isAuthenticated ()) {
    return next ();
  } else {
    return res.status (401).json ({});
  }
}