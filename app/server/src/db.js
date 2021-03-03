import mongodb from 'mongodb';
import { createHash } from './auth/hash.js';

const { MongoClient, ObjectId } = mongodb;

let client = null;
let db = null;
let users = null;
let polls = null;

// connect to database and set up collections
export async function init (uri) {
  // console.log ('&&&&&&&&&&&&&&& INFO db.init');
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
export async function close () {
  // console.log ('&&&&&&&&&&&&&&& INFO db.close');
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
export function findUserByUsername (username) {
  return users.findOne ({ username });
}

// Insert single user with username, password only populated. Suitable for
// register user type functions.
export async function insertUser (username, password) {
  const existing = await findUserByUsername (username);
  if (existing) {
    throw new Error ('User already exists');
  }
  const userHash = createHash (password);
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
export function updateUser (username, name, email, theme) {
  return users.updateOne (
    { username },
    { $set: { name, email, theme } },
  );
}

// remove user by username
export function removeUser (username) {
  return users.deleteOne ({ username });
}

// get all polls
export function getPolls () {
  return polls.find ().toArray ();
}

// get a single poll
export function getPoll (_id) {
  return polls.findOne ({ _id: new ObjectId (_id) });
}

// add a new poll
export function insertPoll (poll) {
  return polls.insertOne (poll, { w: 1 });
}

// update a poll by _id
export function updatePoll (_id, poll) {
  return polls.updateOne ({ _id: new ObjectId (_id) }, { $set: poll });
}

// remove a poll by _id
export function removePoll (_id) {
  return polls.deleteOne ({ _id: new ObjectId (_id) });
}

// remove all polls
export function removePolls () {
  return polls.deleteMany ();
}

// vote in a poll, for a specific choice.
export function vote (_id, choice) {
  return polls.updateOne (
    { _id: new ObjectId (_id), 'choices.text': choice },
    { $inc: { 'choices.$.votes': 1 } },
  );
}
