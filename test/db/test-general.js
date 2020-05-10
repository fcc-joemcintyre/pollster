import * as db from '../../src/server/db.js';

// mongo URI with port number not an active MongoDB instance
const mongoUri = 'mongodb://localhost:27017/pollsterTest';

describe ('init/close', function () {
  describe ('call init twice', function () {
    it ('should succeed both times', async function () {
      await db.init (mongoUri);
      await db.init (mongoUri);
      await db.close ();
    });
  });

  describe ('call close twice', function () {
    it ('should succeed both times', async function () {
      await db.init (mongoUri);
      await db.close ();
      await db.close ();
    });
  });
});
