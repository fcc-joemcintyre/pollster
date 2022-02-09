// @ts-check
import express from 'express';
import cookieSession from 'cookie-session';
import helmet from 'helmet';
import * as fs from 'fs';
import * as http from 'http';
import * as path from 'path';
import passport from 'passport';
import { initAuth } from './auth/auth.js';
import { initRoutes } from './routes.js';
import { initDatabase, closeDatabase } from './db/db.js';

/**
  @typedef { import ('express').Request} Request
  @typedef { import ('express').Response} Response
  @typedef { import ('express').NextFunction} NextFunction
 */

// server instance
/** @type http.Server | undefined */
let server;

// the secret for the session, should be set in an environment variable
// some random text used as a placeholder for dev
const sessionSecret = process.env.SESSION_SECRET || 'randomtext_aseroja';

/**
 * Register new user
 * @param {Request} req Request
 * @param {Response} res Response
 * @param {NextFunction} next Next middleware
 * @returns {void}
 */
const httpsOnly = (req, res, next) => {
  if (req.headers['x-forwarded-proto'] &&
    req.headers['x-forwarded-proto'] !== 'https') {
    res.redirect (['https://', req.hostname, req.url].join (''));
  } else {
    next ();
  }
};

/**
 * Start the server
 * @param {number} port HTTP port number
 * @param {string} dbLocation URL to database
 * @returns {Promise<void>} Promise with no data
 */
export async function startServer (port, dbLocation) {
  try {
    console.log ('INFO Starting server');
    await initDatabase (dbLocation);

    // set up static HTML serving
    const app = express ();

    // if production deployment, only allow https connections
    if (process.env.NODE_ENV === 'production') {
      app.use (httpsOnly);
    }

    // Express security best practices
    app.use (helmet ({
      contentSecurityPolicy: false,
    }));

    // set up HTTP parsers and session manager
    app.use (express.json ());
    app.use (express.urlencoded ({ extended: true }));
    app.use (cookieSession ({
      name: 'session',
      secret: sessionSecret,
    }));

    // set up passport authentication, attach to express session manager
    initAuth ();
    app.use (passport.initialize ());
    app.use (passport.session ());

    // create server with HTML and REST routes
    initRoutes (app);

    app.get ('*.js', (req, res) => {
      const file = path.join (process.cwd (), `public${req.path}.gz`);
      if (req.acceptsEncodings ('gzip') && fs.existsSync (file)) {
        res.set ({
          'content-type': 'text/javascript',
          'content-encoding': 'gzip',
        });
        res.sendFile (file);
      } else {
        res.set ({
          'content-type': 'text/javascript',
        });
        res.sendFile (path.join (process.cwd (), `public${req.path}`));
      }
    });

    // static file handling
    app.use (express.static (path.join (process.cwd (), 'public')));

    // for not explicitly handled REST routes, return 404 message
    app.use ('/api/*', (req, res) => {
      res.status (404).json ({});
    });
    // for all other routes, let client react-router handle them
    app.get ('*', (req, res) => {
      res.sendFile (path.join (process.cwd (), 'public/index.html'));
    });

    server = http.createServer (app);
    server.listen (port, () => {
      console.log (`INFO Server listening on port ${port}`);
    });
  } catch (err) {
    console.log ('ERROR Server startup', err);
    process.exit (1);
  }
}

/**
 * Stop the server
 * @returns {Promise<void>} Promise with no data
 */
export async function stopServer () {
  if (server) {
    await server.close ();
    await closeDatabase ();
  }
}
