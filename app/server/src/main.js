// @ts-check
import { processCommand } from './cmd.js';
import { startServer } from './server.js';

main ();

/**
 * Process command line to start server.
 * @returns {void}
 */
function main () {
  const command = processCommand (process.argv.slice (2));
  if (command.exit) {
    process.exit (command.code);
  }

  const port = Number (process.env.PORT) || command.port;
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/pollster';
  startServer (port, uri);
}
