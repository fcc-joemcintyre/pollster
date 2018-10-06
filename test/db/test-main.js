/* eslint global-require: off */
const mongoClient = require ('mongodb').MongoClient;
const db = require ('../../dist/db');

const uri = 'mongodb://localhost:27017/pollsterTest';

// test init and close functions
describe ('test init/close', function () {
  require ('./test-general');
});

// test application functions
describe ('test-main', function () {
  before (async function () {
    try {
      // reset database
      const client = await mongoClient.connect (uri, { useNewUrlParser: true });
      const dbReset = client.db ();
      const users = dbReset.collection ('users');
      await users.deleteMany ();
      const polls = dbReset.collection ('polls');
      await polls.deleteMany ();
      await client.close ();

      // initialize database for test cases
      await db.init (uri);
    } catch (err) {
      throw err;
    }
  });

  after (async function () {
    await db.close ();
  });

  describe ('test-user', function () {
    require ('./test-user');
  });
  describe ('test-app', function () {
    require ('./test-app');
  });
});
