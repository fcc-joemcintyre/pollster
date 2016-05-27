'use strict';
const db = require ('../../dist/db');
const promiseTry = require ('../../dist/promiseTry');

describe ('users', () => {
  beforeEach ((done) => {
    promiseTry (() => {
      return db.insertUser ('amy', 'test');
    }).then (() => {
      done ();
    }).catch (err => {
      done (err);
    });
  });

  afterEach ((done) => {
    promiseTry (() => {
      return db.removeUser ('amy');
    }).then (() => {
      done ();
    }).catch (err => {
      done (err);
    });
  });

  describe ('find amy', () => {
    it ('should be found', (done) => {
      promiseTry (() => {
        return db.findUserByUsername ('amy');
      }).then (result => {
        if (result) {
          done ();
        } else {
          done (new Error ('not found'));
        }
      }).catch (err => {
        done (err);
      });
    });
  });

  describe ('find amyy', () => {
    it ('should not be found', (done) => {
      promiseTry (() => {
        return db.findUserByUsername ('amyy');
      }).then (result => {
        if (result) {
          done (new Error ('should not be found'));
        } else {
          done ();
        }
      }).catch (err => {
        done (err);
      });
    });
  });

  describe ('update amy', () => {
    it ('should have new name and email', (done) => {
      promiseTry (() => {
        return db.updateUser ('amy', 'Amy Test', 'amy@example.com');
      }).then (() => {
        return db.findUserByUsername ('amy');
      }).then (result => {
        if ((result.name === 'Amy Test') && (result.email === 'amy@example.com')) {
          done ();
        }
        else {
          done (new Error ('invalid update', result));
        }
      }).catch (err => {
        done (err);
      });
    });
  });
});
