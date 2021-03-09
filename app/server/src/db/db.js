// @ts-check
import mongodb from 'mongodb';
import { initCounters } from './counters.js';
import { initPolls } from './polls.js';
import { initUsers } from './users.js';

const { MongoClient } = mongodb;
/** @type mongodb.MongoClient */
let client = null;
/** @type mongodb.Db */
let db = null;

/**
 * Connect to database and set up collections
 * @param {string} uri Database connection string
 * @returns {Promise<mongodb.Db>} Database interface
 */
export async function initDatabase (uri) {
  console.log ('INFO initDatabase');
  if (!client) {
    try {
      const options = { useNewUrlParser: true, useUnifiedTopology: true };
      // eslint-disable-next-line require-atomic-updates
      client = await MongoClient.connect (uri, options);
      db = client.db ();
      initCounters (db);
      initPolls (db);
      initUsers (db);
    } catch (err) {
      console.log ('ERROR initDatabase', err);
      throw err;
    }
  }
  return db;
}

/**
 * Close database and null out references
 * @returns {Promise<void>} Promise with no data
 */
export async function closeDatabase () {
  console.log ('INFO closeDatabase');
  if (client) {
    try {
      await client.close ();
    } finally {
      db = null;
      // eslint-disable-next-line require-atomic-updates
      client = null;
    }
  }
}
