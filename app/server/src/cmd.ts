// eslint-disable-next-line no-shadow
export enum DbParam { none = '', mongodb = 'mongodb' }

export type CommandResult = {
  code: number,
  exit: boolean,
  port: number,
  db: DbParam,
};

type Options = {
  p?: string,
  h?: boolean,
  db?: string,
};

/**
 * Valid command options
 *  [-p | --port] port to listen on, default 3000
 *  [-d | --db] database to use (mongodb), default mongodb
 *  [-h | --help] display help info
 *
 * @param args Array of arguments
 * @returns Command parsing result
 */
export function processCommand (args: string[]): CommandResult {
  const values: Options = {};
  const errors = [];

  for (const arg of args) {
    const [key, value] = arg.split ('=');
    switch (key) {
      case '-p':
      case '--port':
        values.p = value;
        break;

      case '-d':
      case '--db':
        values.db = value;
        break;

      case '-h':
      case '--help':
        values.h = true;
        break;

      default:
        errors.push (`Error: Invalid option (${key})`);
    }
  }

  // validate arguments
  let port = 3000;
  if (values.p) {
    const t = Number (values.p);
    if (Number.isInteger (t) && (t > 0 && t < 65536)) {
      port = t;
    } else {
      errors.push (`Invalid port number (${values.p}). Must be integer between 0 and 65535`);
      port = 0;
    }
  }

  let db: DbParam = DbParam.mongodb;
  if (values.db) {
    if (values.db.toLowerCase () !== 'mongodb') {
      errors.push (`Invalid database (${values.db}). Must be mongodb`);
      db = DbParam.none;
    }
  }

  let help = false;
  if (values.h) {
    help = true;
  }

  // if help not an argument, output list of errors
  if ((!values.h) && (errors.length > 0)) {
    for (const error of errors) {
      console.log (error);
    }
  }

  // if help argument or errors, output usage message
  if (values.h || (errors.length > 0)) {
    console.log (
      `Usage: node pollster.js [-p=port] [-h]
    -p or --port      Port number to listen on. Default: 3000
    -d or --db        Database (mongodb). Default: mongodb
    -h or --help      This message.`
    );
  }

  return ({
    code: errors.length === 0 ? 0 : 1,
    exit: errors.length > 0 || help,
    port,
    db,
  });
}
