const MongoClient = require ('mongodb').MongoClient;
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
      return MongoClient.connect (uri, (err, instance) => {
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
  if (users) {
    return users.findOne ({ username });
  } else {
    return Promise.reject (new Error ('Database not available'));
  }
}

// Insert single user with username, password only populated. Suitable for
// register user type functions.
function insertUser (username, password) {
  if (users) {
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
  } else {
    return Promise.reject (new Error ('Database not available'));
  }
}

// Update user information (not username or password).
function updateUser (username, name, email) {
  if (users) {
    return users.update (
      { username },
      { $set: { name, email } }
    );
  } else {
    return Promise.reject (new Error ('Database not available'));
  }
}

// remove user by username
function removeUser (username) {
  if (users) {
    return users.remove ({ username });
  } else {
    return Promise.reject (new Error ('Database not available'));
  }
}

// get all polls
function getPolls () {
  if (polls) {
    return polls.find ().toArray ();
  } else {
    return Promise.reject (new Error ('Database not available'));
  }
}

// get a single poll
function getPoll (_id) {
  if (polls) {
    return polls.findOne ({ _id: new ObjectId (_id) });
  } else {
    return Promise.reject (new Error ('Database not available'));
  }
}

// add a new poll
function insertPoll (poll) {
  if (polls) {
    return polls.insert (poll, { w: 1 });
  } else {
    return Promise.reject (new Error ('Database not available'));
  }
}

// update a poll by _id
function updatePoll (_id, poll) {
  if (polls) {
    return polls.update ({ _id: new ObjectId (_id) }, poll);
  } else {
    return Promise.reject (new Error ('Database not available'));
  }
}

// remove a poll by _id
function removePoll (_id) {
  if (polls) {
    return polls.remove ({ _id: new ObjectId (_id) });
  } else {
    return Promise.reject (new Error ('Database not available'));
  }
}

// remove all polls
function removePolls () {
  if (polls) {
    return polls.remove ({});
  } else {
    return Promise.reject (new Error ('Database not available'));
  }
}

// vote in a poll, for a specific choice.
function vote (_id, choice) {
  if (polls) {
    return polls.update (
      { _id: new ObjectId (_id), 'choices.text': choice },
      { $inc: { 'choices.$.votes': 1 } });
  } else {
    return Promise.reject (new Error ('Database not available'));
  }
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
