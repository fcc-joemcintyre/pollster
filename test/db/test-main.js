'use strict';
const mongoClient = require ('mongodb').MongoClient;
const db = require ('../../dist/db');

const uri = 'mongodb://localhost:27017/pollsterTest';
let testdb = {
  db: null,
  users: null,
  polls: null
};
exports.testdb = testdb;

before (function (done) {
  Promise.resolve ().then (() => {
    return mongoClient.connect (uri);
  }).then (dbInstance => {
    testdb.db = dbInstance;
    testdb.users = testdb.db.collection ('users');
    return testdb.users.ensureIndex ({username: 1}, {unique: true});
  }).then (() => {
    return testdb.users.remove ({});
  }).then (() => {
    testdb.polls = testdb.db.collection ('polls');
    return testdb.polls.remove ({});
  }).then (() => {
    return db.init (uri);
  }).then (() => {
    done ();
  }).catch (err => {
    done (err);
  });
});

after (function (done) {
  Promise.resolve ().then (() => {
    return db.close ();
  }).then (() => {
    return testdb.db.close ();
  }).then (() => {
    done ();
  }).catch (err => {
    done (err);
  });
});

describe ('test-main', function () {
  describe ('test-user', function () {
    require ('./test-user');
  });
  describe ('test-app', function () {
    require ('./test-app');
  });
});
