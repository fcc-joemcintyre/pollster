const MongoClient = require ('mongodb').MongoClient;
const ObjectId = require ('mongodb').ObjectId;
const hash = require ('./hash');

let client = null;
let db = null;
let users = null;
let polls = null;

// connect to database and set up collections
async function init (uri) {
  console.log ('INFO db.init');
  if (client) { return; }

  try {
    // eslint-disable-next-line require-atomic-updates
    client = await MongoClient.connect (uri, { useNewUrlParser: true, useUnifiedTopology: true });
    db = client.db ();
    users = db.collection ('users');
    polls = db.collection ('polls');
    await users.createIndex ({ username: 1 }, { unique: true });
  } catch (err) {
    console.log ('ERROR db.init', err);
    throw err;
  }
}

// Close database and null out references
async function close () {
  if (client) {
    try {
      users = null;
      polls = null;
      await client.close ();
    } finally {
      // eslint-disable-next-line require-atomic-updates
      client = null;
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
    theme: 'base',
  };
  const result = await users.insertOne (user, { w: 1 });
  return result;
}

// Update user information (not username or password).
function updateUser (username, name, email, theme) {
  return users.updateOne (
    { username },
    { $set: { name, email, theme } },
  );
}

// remove user by username
function removeUser (username) {
  return users.deleteOne ({ username });
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
  return polls.insertOne (poll, { w: 1 });
}

// update a poll by _id
function updatePoll (_id, poll) {
  return polls.updateOne ({ _id: new ObjectId (_id) }, { $set: poll });
}

// remove a poll by _id
function removePoll (_id) {
  return polls.deleteOne ({ _id: new ObjectId (_id) });
}

// remove all polls
function removePolls () {
  return polls.deleteMany ();
}

// vote in a poll, for a specific choice.
function vote (_id, choice) {
  return polls.updateOne (
    { _id: new ObjectId (_id), 'choices.text': choice },
    { $inc: { 'choices.$.votes': 1 } },
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
