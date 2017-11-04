/* eslint global-require: off */
const mongoClient = require ('mongodb').MongoClient;
const server = require ('../../dist/server');
const db = require ('../../dist/db');

// set up browser variables and fetch implementation
const port = 3999;
global.window = {
  location: {
    origin: `http://localhost:${port}`,
  },
};
global.fetch = require ('fetch-cookie') (require ('node-fetch'));

const dbURI = 'mongodb://localhost:27017/pollsterTest';

before (async function () {
  await resetDatabase ();
  await db.init (dbURI);
  await db.insertUser ('amy', 'test');
  await db.close ();
  await server.start (port, dbURI);
});

async function resetDatabase () {
  const instance = await mongoClient.connect (dbURI);
  const users = instance.collection ('users');
  await users.remove ({});
  const polls = instance.collection ('polls');
  await polls.remove ({});
}

describe ('server', function () {
  describe ('test-cmd', function () {
    require ('./test-cmd');
  });
  describe ('test-page', function () {
    require ('./test-page');
  });
  describe ('test-user', function () {
    require ('./test-user');
  });
  describe ('test-app', function () {
    require ('./test-app');
  });
});
