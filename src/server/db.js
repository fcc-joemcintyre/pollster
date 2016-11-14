const mongoClient = require ('mongodb').MongoClient;
const ObjectId = require ('mongodb').ObjectId;
const hash = require ('./hash');

let db = null;
let users = null;
let polls = null;

// connect to database and set up collections
function init (uri) {
  console.log ('db.init');
  return new Promise ((resolve, reject) => {
    if (db === null) {
      return mongoClient.connect (uri, (err, instance) => {
        if (err) {
          console.log ('  err', err);
          return reject (err);
        }
        db = instance;
        return Promise.resolve ().then (() => {
          users = db.collection ('users');
          return users.ensureIndex ({ username: 1 }, { unique: true });
        }).then (() => {
          polls = db.collection ('polls');
          return resolve ();
        }).catch ((err2) => {
          console.log ('  err', err2);
          return reject (err2);
        });
      });
    } else {
      return resolve ();
    }
  });
}

// Close database and null out references
function close () {
  return new Promise ((resolve) => {
    if (db) {
      users = null;
      polls = null;
      return Promise.resolve ().then (() => {
        return db.close ();
      }).then (() => {
        db = null;
        return resolve ();
      }).catch (() => {
        db = null;
        return resolve ();
      });
    } else {
      return resolve ();
    }
  });
}

// Find single user by user name
function findUserByUsername (username) {
  return users.findOne ({ username });
}

// Insert single user with username, password only populated. Suitable for
// register user type functions.
function insertUser (username, password) {
  return new Promise ((resolve, reject) => {
    Promise.resolve ().then (() => {
      return findUserByUsername (username);
    }).then ((result) => {
      if (result !== null) {
        return reject (new Error ('User already exists'));
      }
      const userHash = hash.create (password);
      const user = {
        username,
        hash: userHash.hash,
        salt: userHash.salt,
        name: '',
        email: '',
      };
      return users.insert (user, { w: 1 });
    }).then ((result) => {
      resolve (result);
    }).catch ((err) => {
      reject (err);
    });
  });
}

// Update user information (not username or password).
function updateUser (username, name, email) {
  return users.update (
    { username },
    { $set: { name, email } }
  );
}

// remove user by username
function removeUser (username) {
  return users.remove ({ username });
}

// get all polls
function getPolls () {
  return polls.find ().toArray ();
}

// get a single poll
function getPoll (_id) {
  return polls.findOne ({ _id: new ObjectId (_id) });
}

// add a new poll
function insertPoll (poll) {
  return polls.insert (poll, { w: 1 });
}

// update a poll by _id
function updatePoll (_id, poll) {
  return polls.update ({ _id: new ObjectId (_id) }, poll);
}

// remove a poll by _id
function removePoll (_id) {
  return polls.remove ({ _id: new ObjectId (_id) });
}

// remove all polls
function removePolls () {
  return polls.remove ({});
}

// vote in a poll, for a specific choice.
function vote (_id, choice) {
  return polls.update (
      { _id: new ObjectId (_id), 'choices.text': choice },
      { $inc: { 'choices.$.votes': 1 } });
}

exports.init = init;
exports.close = close;
exports.findUserByUsername = findUserByUsername;
exports.insertUser = insertUser;
exports.updateUser = updateUser;
exports.removeUser = removeUser;
exports.getPolls = getPolls;
exports.getPoll = getPoll;
exports.insertPoll = insertPoll;
exports.updatePoll = updatePoll;
exports.removePoll = removePoll;
exports.removePolls = removePolls;
exports.vote = vote;
