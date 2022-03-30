import { initDatabase, closeDatabase } from './db.js';
import { createPoll, getPoll, getPolls, removePoll, updatePoll, vote } from './polls.js';
import { deleteUser, findUserByEmail, getProfile, registerUser, updateProfile } from './users.js';

export {
  initDatabase, closeDatabase,
  createPoll, getPoll, getPolls, removePoll, updatePoll, vote,
  deleteUser, findUserByEmail, getProfile, registerUser, updateProfile,
};
