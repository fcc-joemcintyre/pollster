/* eslint prefer-arrow-callback: off */
const db = require ('../../dist/db');

describe ('users', function () {
  beforeEach (function (done) {
    Promise.resolve ().then (() => {
      return db.insertUser ('amy', 'test');
    }).then (() => {
      done ();
    }).catch (err => {
      done (err);
    });
  });

  afterEach (function (done) {
    Promise.resolve ().then (() => {
      return db.removeUser ('amy');
    }).then (() => {
      done ();
    }).catch (err => {
      done (err);
    });
  });

  describe ('find amy', function () {
    it ('should be found', function (done) {
      Promise.resolve ().then (() => {
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

  describe ('find amyy', function () {
    it ('should not be found', function (done) {
      Promise.resolve ().then (() => {
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

  describe ('update amy', function () {
    it ('should have new name and email', function (done) {
      Promise.resolve ().then (() => {
        return db.updateUser ('amy', 'Amy Test', 'amy@example.com');
      }).then (() => {
        return db.findUserByUsername ('amy');
      }).then (result => {
        if ((result.name === 'Amy Test') && (result.email === 'amy@example.com')) {
          done ();
        } else {
          done (new Error ('invalid update', result));
        }
      }).catch (err => {
        done (err);
      });
    });
  });
});
