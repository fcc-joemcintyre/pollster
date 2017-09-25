const MongoClient = require ('mongodb').MongoClient;
const ObjectId = require ('mongodb').ObjectId;
const hash = require ('./hash');

let db = null;
let users = null;
let polls = null;

// connect to database and set up collections
async function init (uri) {
  console.log ('INFO db.init');
  if (db) { return; }

  try {
    db = await MongoClient.connect (uri);
    users = db.collection ('users');
    polls = db.collection ('polls');
    await users.ensureIndex ({ username: 1 }, { unique: true });
  } catch (err) {
    console.log ('ERROR db.init', err);
    throw err;
  }
}

// Close database and null out references
async function close () {
  if (db) {
    try {
      users = null;
      polls = null;
      await db.close ();
      db = null;
    } catch (err) {
      db = null;
    }
  }
}

// Find single user by user name
function findUserByUsername (username) {
  return users.findOne ({ username });
}

// Insert single user with username, password only populated. Suitable for
// register user type functions.
async function insertUser (username, password) {
  try {
    const existing = await findUserByUsername (username);
    if (existing) {
      throw new Error ('User already exists');
    }
    const userHash = hash.create (password);
    const user = {
      username,
      hash: userHash.hash,
      salt: userHash.salt,
      name: '',
      email: '',
    };
    const result = await users.insert (user, { w: 1 });
    return result;
  } catch (err) {
    throw err;
  }
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
    { $inc: { 'choices.$.votes': 1 } }
  );
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
