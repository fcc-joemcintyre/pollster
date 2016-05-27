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

before ((done) => {
  mongoClient.connect (uri)
  .then (dbInstance => {
    testdb.db = dbInstance;
    testdb.users = testdb.db.collection ('users');
    return testdb.users.ensureIndex ({username: 1}, {unique: true});
  }).then (() => {
    return testdb.users.remove ({});
  }).then (() => {
    testdb.polls = testdb.db.collection ('polls');
//    return testdb.bars.ensureIndex ({id: 1}, {unique: true});
//  }).then (() => {
    return testdb.polls.remove ({});
  }).then (() => {
//    let data = [
//      { id: 'the-dancing-bear-pub-waco', going: [] },
//      { id: 'dichotomy-coffee-and-spirits-waco-2', going: [] },
//      { id: 'brazos-bar-and-bistro-waco', going: [] },
//      { id: 'trojan-cork-and-keg-waco', going: [] }
//    ];
//    return testdb.bars.insert (data, {w:1});
//  }).then (() => {
    return testdb.db.close ();
  }).then (() => {
    return db.init (uri);
  }).then (() => {
    done ();
  })
  .catch (err => {
    done (err);
  });
});

after ((done) => {
  testdb.db.close ()
  .then (() => {
    done ();
  });
});

describe ('test-main', () => {
  describe ('test-user', () => {
    require ('./test-user');
  });
  describe ('test-app', () => {
    require ('./test-app');
  });
});
