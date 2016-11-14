const db = require ('../../dist/db');

// mongo URI with port number not an active MongoDB instance
const badMongoUri = 'mongodb://localhost:22222/pollsterTest';

describe ('init/close', function () {
  describe ('init', function () {
    it ('should generate an error', function (done) {
      Promise.resolve ().then (() => {
        return db.init (badMongoUri);
      }).then (() => {
        done (new Error ('init did not fail with bad URI'));
      }).catch (() => {
        done ();
      });
    });
  });

  describe ('close', function () {
    it ('should fail silently', function (done) {
      Promise.resolve ().then (() => {
        return db.close ();
      }).then (() => {
        done ();
      }).catch (() => {
        done (new Error ('close should fail silently'));
      });
    });
  });
});

describe ('users', function () {
  describe ('findUserByUsername', function () {
    it ('should generate an error', function (done) {
      Promise.resolve ().then (() => {
        return db.findUserByUsername ('amy');
      }).then (() => {
        done (new Error ('did not fail with no database connection'));
      }).catch (() => {
        done ();
      });
    });
  });

  describe ('insertUser', function () {
    it ('should generate an error', function (done) {
      Promise.resolve ().then (() => {
        return db.insertUser ('newuser', 'password');
      }).then (() => {
        done (new Error ('did not fail with no database connection'));
      }).catch (() => {
        done ();
      });
    });
  });

  describe ('updateUser', function () {
    it ('should generate an error', function (done) {
      Promise.resolve ().then (() => {
        return db.updateUser ('amy', 'new name', 'newemail@example.com');
      }).then (() => {
        done (new Error ('did not fail with no database connection'));
      }).catch (() => {
        done ();
      });
    });
  });

  describe ('removeUser', function () {
    it ('should generate an error', function (done) {
      Promise.resolve ().then (() => {
        return db.removeUser ('amy');
      }).then (() => {
        done (new Error ('did not fail with no database connection'));
      }).catch (() => {
        done ();
      });
    });
  });

  describe ('getPolls', function () {
    it ('should generate an error', function (done) {
      Promise.resolve ().then (() => {
        return db.getPolls ();
      }).then (() => {
        done (new Error ('did not fail with no database connection'));
      }).catch (() => {
        done ();
      });
    });
  });

  describe ('getPoll', function () {
    it ('should generate an error', function (done) {
      Promise.resolve ().then (() => {
        return db.getPin ('000000000000000000000000');
      }).then (() => {
        done (new Error ('did not fail with no database connection'));
      }).catch (() => {
        done ();
      });
    });
  });

  describe ('insertPoll', function () {
    it ('should generate an error', function (done) {
      Promise.resolve ().then (() => {
        return db.insertPoll ({ creator: 'amy' });
      }).then (() => {
        done (new Error ('did not fail with no database connection'));
      }).catch (() => {
        done ();
      });
    });
  });

  describe ('updatePoll', function () {
    it ('should generate an error', function (done) {
      Promise.resolve ().then (() => {
        return db.updatePoll ('000000000000000000000000', { creator: 'amy' });
      }).then (() => {
        done (new Error ('did not fail with no database connection'));
      }).catch (() => {
        done ();
      });
    });
  });

  describe ('removePoll', function () {
    it ('should generate an error', function (done) {
      Promise.resolve ().then (() => {
        return db.removePoll ('000000000000000000000000');
      }).then (() => {
        done (new Error ('did not fail with no database connection'));
      }).catch (() => {
        done ();
      });
    });
  });

  describe ('vote', function () {
    it ('should generate an error', function (done) {
      Promise.resolve ().then (() => {
        return db.vote ('000000000000000000000000', 'Blue');
      }).then (() => {
        done (new Error ('did not fail with no database connection'));
      }).catch (() => {
        done ();
      });
    });
  });
});
