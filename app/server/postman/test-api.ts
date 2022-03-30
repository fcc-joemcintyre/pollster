import express from 'express';
import http from 'http';
import { MongoClient } from 'mongodb';
import newman from 'newman'; // eslint-disable-line
import { Poll, User } from '../src/db/index.js';
import { startServer, stopServer } from '../src/server.js';

const port = 3000;
const uri = 'mongodb://localhost:27018/pollsterPostman';

// hash and salt for password test
const hash = '0811ec26719dd7633f3f91276fb47220a0bd82f1eff243abf09a4257987a4a0c8ec1c332d95cc281e2fec388092888b9d231b78da57f46a0df4a75842eea60ff';
const salt = '2ddbd3923c0ff0dc86215cf8cc277f1a';

main ();

/**
 * Initialize test server instance
 * if --server arg provided, start server for interactive use
 * if no arg provided, run postman tests and exit
 */
async function main (): Promise<void> {
  const args = process.argv.slice (2);
  const server = args.reduce ((acc: boolean, a) => (
    acc || a.toLowerCase () === '--server'
  ), false);

  // reset database and start application server
  await resetDatabase ();
  await startServer (port, uri);

  // start management server to support test specific APIs
  const app = express ();
  app.post ('/api/test/reset', async (req, res) => {
    console.log ('reset test environment');
    await resetDatabase ();
    res.status (200).json ({});
  });
  const t = http.createServer (app);
  await listenAsync (t, 3001);

  // if running tests, start test runner
  if (!server) {
    newman.run ({
      collection: 'pollster.postman_collection.json',
      environment: 'local.postman_environment.json',
      reporters: 'cli',
    }, async () => {
      await stopServer ();
      process.exit (0);
    });
  }
}

/**
 * Initialize database
 */
async function resetDatabase () {
  // initialize database
  const initialCounters = [
    { _id: 'users', sequence: 3 },
    { _id: 'polls', sequence: 3 },
  ];

  const initialUsers: User[] = [
    { key: 1, email: 'a@example.com', name: 'A A', theme: 'light', hash, salt },
    { key: 2, email: 'b@example.com', name: 'B B', theme: 'light', hash, salt },
    { key: 3, email: 'c@example.com', name: 'C C', theme: 'light', hash, salt },
  ];

  const initialPolls: Poll[] = [
    { key: 1, creator: 1, title: 'T1', choices: [{ text: 'A', votes: 0 }, { text: 'B', votes: 0 }] },
    { key: 2, creator: 1, title: 'T2', choices: [{ text: 'A', votes: 0 }, { text: 'B', votes: 0 }] },
    { key: 3, creator: 2, title: 'T3', choices: [{ text: 'A', votes: 0 }, { text: 'B', votes: 0 }] },
  ];

  const client = await MongoClient.connect (uri);
  const db = client.db ();
  const c1 = db.collection ('counters');
  await c1.deleteMany ({});
  await c1.insertMany (initialCounters as any); // eslint-disable-line

  const c2 = db.collection ('users');
  await c2.deleteMany ({});
  await c2.createIndex ({ email: 1 }, { unique: true, name: 'email' });
  await c2.insertMany (initialUsers);

  const c3 = db.collection ('polls');
  await c3.deleteMany ({});
  await c3.insertMany (initialPolls);
  client.close ();
}

/**
 * Async / await support for http.Server.listen
 * @param s http.Server instance
 * @param p port number
 * @returns Promise to await server.listen on
 */
function listenAsync (s: http.Server, p: number) {
  return new Promise ((resolve) => {
    s.listen (p, () => { resolve (true); });
  });
}
