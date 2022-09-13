import { processCommand } from './cmd.js';
import { startServer } from './server.js';

main ();

/**
 * Process command line to start server.
 */
function main (): void {
  const command = processCommand (process.argv.slice (2));
  if (command.exit) {
    process.exit (command.code);
  }

  const port = Number (process.env.PORT) || command.port;
  const uri = command.db === 'mongodb' ?
    process.env.MONGODB_URI || 'mongodb://localhost:27017/pollster' : '';
  if (uri) {
    if (process.env.MONGODB_URI) {
      console.log ('INFO Using production database');
    } else {
      console.log ('INFO Using local database');
    }
  }
  startServer (port, uri);
}
