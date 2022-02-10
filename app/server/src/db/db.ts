import { Db, MongoClient } from 'mongodb';
import { initCounters } from './counters.js';
import { initPolls } from './polls.js';
import { initUsers } from './users.js';

// connection status to share connection
let status = 0;
let client: MongoClient;
let db: Db;

/**
 * Connect to database and set up collections
 * @param uri Database connection string
 * @returns Database instance
 */
export async function initDatabase (uri: string): Promise<Db | null> {
  console.log ('INFO initDatabase');
  // existing connection
  if (status === 2) {
    return db;
  }
  // connection being set up already
  if (status === 1) {
    return null;
  }
  status = 1; // setting up connection

  try {
    const options = {};
    client = await MongoClient.connect (uri, options);
    db = client.db ();
    initCounters (db);
    initPolls (db);
    initUsers (db);
  } catch (err) {
    status = 0; // eslint-disable-line require-atomic-updates
    console.log ('ERROR initDatabase', err);
    throw err;
  }

  status = 2; // eslint-disable-line require-atomic-updates
  return db;
}

/**
 * Close database and null out references
 * @returns Promise with no data
 */
export async function closeDatabase () {
  console.log ('INFO closeDatabase');
  if (client) {
    await client.close ();
  }
  status = 0;
}
