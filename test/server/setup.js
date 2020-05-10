/* eslint global-require: off */
import mongodb from 'mongodb';
import fetchCookie from 'fetch-cookie';
import nodeFetch from 'node-fetch';

import * as server from '../../src/server/server.js';
import * as db from '../../src/server/db.js';

const MongoClient = mongodb.MongoClient;
const dbURI = 'mongodb://localhost:27017/pollsterTest';

export async function setupBefore () {
  // set up browser variables and fetch implementation
  const port = 3999;
  global.window = {
    location: {
      origin: `http://localhost:${port}`,
    },
  };
  global.fetch = fetchCookie (nodeFetch);

  // clear database
  const client = await MongoClient.connect (dbURI, { useNewUrlParser: true });
  const instance = client.db ();
  const users = instance.collection ('users');
  await users.deleteMany ();
  const polls = instance.collection ('polls');
  await polls.deleteMany ();
  await client.close ();

  await db.init (dbURI);
  await db.insertUser ('amy', 'test');
  await db.close ();
  await server.start (port, dbURI);
}

export async function setupAfter () {
  await server.stop ();
}
