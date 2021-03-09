// @ts-check
import { createHash } from '../auth/hash.js';
import { getNextSequence } from './counters.js';

/**
 * @typedef { import ('mongodb').Collection} mongodb.Collection
 * @typedef { import ('mongodb').Db} mongodb.Db
 */

/**
 * @typedef { import ('../types/types').User} User
 * @typedef { import ('../types/types').UserResult} UserResult
 */

/** @type mongodb.Collection */
let c;

/**
 * Initialize collection
 * @param {mongodb.Db} db MongoDB db instance object
 * @returns {void}
 */
export function initUsers (db) {
  c = db.collection ('users');
}

/**
 * Find single user by email
 * @param {string} email User email
 * @returns {Promise<UserResult>} User result
 */
export async function findUserByEmail (email) {
  const user = await c.findOne ({ email });
  return ({
    status: user ? 200 : 404,
    user,
  });
}

/**
 * Register user, creating skeleton user document
 * @param {string} email Email
 * @param {string} password Password
 * @returns {Promise<UserResult>} Result for new user
 */
export async function registerUser (email, password) {
  const hash = createHash (password);
  try {
    const key = getNextSequence ('users');
    const t = await c.insertOne (
      { key, email: '', name: '', theme: 'light', hash: hash.hash, salt: hash.salt },
      { w: 1 },
    );
    return ({
      status: t.ops[0] ? 200 : 400,
      user: t.ops[0] || null,
    });
  } catch (err) {
    return ({
      status: err.code === 11000 ? 409 : 500,
      user: null,
    });
  }
}

/**
 * Delete user
 * @param {number} key User key
 * @returns {Promise<UserResult>} Status code
 */
export async function deleteUser (key) {
  try {
    await c.deleteOne ({ key });
    return { status: 200, user: null };
  } catch (err) {
    return { status: 500, user: null };
  }
}

/**
 * Get profile for user
 * @param {number} key User key
 * @returns {Promise<UserResult>} User profile
 */
export async function getProfile (key) {
  const user = await c.findOne ({ key });
  return ({
    status: user ? 200 : 404,
    user,
  });
}

/**
 * Update profile for user
 * @param {number} key User key
 * @param {string} name Name
 * @param {string} theme Theme
 * @returns {Promise<UserResult>} User profile
 */
export async function updateProfile (key, name, theme) {
  const user = await c.findOneAndUpdate (
    { key },
    { $set: { name, theme } },
    { returnOriginal: false },
  );
  return ({
    status: user.value ? 200 : 404,
    user: user.value,
  });
}
