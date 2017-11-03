const db = require ('../../dist/db');

// mongo URI with port number not an active MongoDB instance
const badMongoUri = 'mongodb://localhost:22222/pollsterTest';

describe ('init/close', function () {
  describe ('init', function () {
    it ('should generate an error', async function () {
      try {
        await db.init (badMongoUri);
        throw new Error ('init did not fail with bad URI');
      } catch (err) {
        // test passed
      }
    });
  });

  describe ('close', function () {
    it ('should fail silently', async function () {
      try {
        await db.close ();
      } catch (err) {
        throw new Error ('close should fail silently');
      }
    });
  });
});

describe ('users', function () {
  describe ('findUserByUsername', function () {
    it ('should generate an error', async function () {
      try {
        await db.findUserByUsername ('amy');
        throw new Error ('did not fail with no database connection');
      } catch (err) {
        // test passed
      }
    });
  });

  describe ('insertUser', function () {
    it ('should generate an error', async function () {
      try {
        await db.insertUser ('newuser', 'password');
        throw new Error ('did not fail with no database connection');
      } catch (err) {
        // test passed;
      }
    });
  });

  describe ('updateUser', function () {
    it ('should generate an error', async function () {
      try {
        await db.updateUser ('amy', 'new name', 'newemail@example.com');
        throw new Error ('did not fail with no database connection');
      } catch (err) {
        // test passed;
      }
    });
  });

  describe ('removeUser', function () {
    it ('should generate an error', async function () {
      try {
        await db.removeUser ('amy');
        throw new Error ('did not fail with no database connection');
      } catch (err) {
        // test passed;
      }
    });
  });

  describe ('getPolls', function () {
    it ('should generate an error', async function () {
      try {
        await db.getPolls ();
        throw new Error ('did not fail with no database connection');
      } catch (err) {
        // test passed;
      }
    });
  });

  describe ('getPoll', function () {
    it ('should generate an error', async function () {
      try {
        await db.getPin ('000000000000000000000000');
        throw new Error ('did not fail with no database connection');
      } catch (err) {
        // test passed;
      }
    });
  });

  describe ('insertPoll', function () {
    it ('should generate an error', async function () {
      try {
        await db.insertPoll ({ creator: 'amy' });
        throw new Error ('did not fail with no database connection');
      } catch (err) {
        // test passed;
      }
    });
  });

  describe ('updatePoll', function () {
    it ('should generate an error', async function () {
      try {
        await db.updatePoll ('000000000000000000000000', { creator: 'amy' });
        throw new Error ('did not fail with no database connection');
      } catch (err) {
        // test passed;
      }
    });
  });

  describe ('removePoll', function () {
    it ('should generate an error', async function () {
      try {
        await db.removePoll ('000000000000000000000000');
        throw new Error ('did not fail with no database connection');
      } catch (err) {
        // test passed;
      }
    });
  });

  describe ('vote', function () {
    it ('should generate an error', async function () {
      try {
        await db.vote ('000000000000000000000000', 'Blue');
        throw new Error ('did not fail with no database connection');
      } catch (err) {
        // test passed;
      }
    });
  });
});
