const db = require ('../../dist/db');

// mongo URI with port number not an active MongoDB instance
const mongoUri = 'mongodb://localhost:27017/pollsterTest';

describe ('init/close', function () {
  describe ('call init twice', function () {
    it ('should succeed both times', async function () {
      try {
        await db.init (mongoUri);
        try {
          await db.init (mongoUri);
        } catch (err) {
          throw new Error ('init failed on second call', err);
        }
      } catch (err) {
        throw new Error ('init failed on first call', err);
      }
    });
  });

  describe ('call close twice', function () {
    it ('should succeed both times', async function () {
      try {
        await db.close ();
        try {
          await db.close ();
        } catch (err) {
          throw new Error ('close failed on second call', err);
        }
      } catch (err) {
        throw new Error ('close failed on first call', err);
      }
    });
  });
});
