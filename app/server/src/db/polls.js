// @ts-check
import { getNextSequence } from './counters.js';

/**
 * @typedef { import ('mongodb').Collection} mongodb.Collection
 * @typedef { import ('mongodb').Db} mongodb.Db
 */

/**
 * @typedef { import ('../types/types').Poll} Poll
 * @typedef { import ('../types/types').PollChoice} PollChoice
 * @typedef { import ('../types/types').PollResult} PollResult
 * @typedef { import ('../types/types').PollArrayResult} PollArrayResult
 */

/** @type mongodb.Collection */
let c;

/**
 * Initialize collection
 * @param {mongodb.Db} db MongoDB db instance object
 * @returns {void}
 */
export function initPolls (db) {
  c = db.collection ('polls');
}

/**
 * Get all pools
 * @param {Object} q Query
 * @returns {Promise<PollArrayResult>} Array of polls
 */
export async function getPolls (q) {
  try {
    const polls = await c.find (q).toArray ();
    return ({ status: 200, polls });
  } catch (err) {
    return ({ status: 500, polls: null });
  }
}

/**
 * Get a single poll
 * @param {number} key Poll key
 * @returns {Promise<PollResult>} Poll
 */
export async function getPoll (key) {
  try {
    const poll = await c.findOne ({ key });
    return ({
      status: poll ? 200 : 404,
      poll,
    });
  } catch (err) {
    return ({ status: 500, poll: null });
  }
}

/**
 * Create a poll
 * @param {number} creator Creator user key
 * @param {string} title Poll title
 * @param {PollChoice[]} choices Poll choices
 * @returns {Promise<PollResult>} Created book
 */
export async function createPoll (creator, title, choices) {
  const key = await getNextSequence ('polls');
  const t = await c.insertOne (
    { key, creator, title, choices },
    { w: 1 }
  );
  return ({
    status: t.ops[0] ? 200 : 500,
    poll: t.ops[0] || null,
  });
}

/**
 * Update a poll
 * @param {number} key Poll key
 * @param {string} title Poll title
 * @param {PollChoice[]} choices Poll choices
 * @returns {Promise<PollResult>} Updated poll
 */
export async function updatePoll (key, title, choices) {
  const t = await c.findOneAndUpdate (
    { key },
    { $set: { title, choices } },
    { returnOriginal: false }
  );
  return ({
    status: t.value ? 200 : 500,
    poll: t.value,
  });
}

/**
 * Delete a poll
 * @param {number} key Poll key
 * @returns {PollResult} Result (0 - ok, 404 - not deleted)
 */
export function removePoll (key) {
  try {
    c.deleteOne ({ key });
    return { status: 200, poll: null };
  } catch (err) {
    return { status: 404, poll: null };
  }
}

/**
 * Vote in a poll for a specific choice
 * @param {number} key Poll key
 * @param {string} choice Poll item
 * @returns {Promise<PollResult>} Updated poll
 */
export async function vote (key, choice) {
  const t = await c.findOneAndUpdate (
    { key, 'choices.text': choice },
    { $inc: { 'choices.$.votes': 1 } },
    { returnOriginal: false },
  );
  return ({
    status: t.value ? 200 : 500,
    poll: t.value,
  });
}
