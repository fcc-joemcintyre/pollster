import { Db } from 'mongodb';
import * as mongo from './mongodb/index.js';

// types used by database interface

export type PollChoice = {
  text: string,
  votes: number,
};

export type Poll = {
  key: number,
  creator: number,
  title: string,
  choices: PollChoice[],
};

export type PollResult = {
  status: number,
  poll?: Poll | null,
};

export type PollArrayResult = {
  status: number,
  count: number,
  polls?: Poll[],
};

export type PollQuery = {
  creator?: number,
};

export type User = {
  key: number,
  email: string,
  name: string,
  theme: string,
  hash: string,
  salt: string,
};

export type UserResult = {
  status: number,
  user?: User | null,
};

export type Database = {
  initDatabase: (uri: string) => Promise<Db | null>,
  closeDatabase: () => void,
  getPolls (q: PollQuery, offset: number, limit: number): Promise<PollArrayResult>,
  getPoll (key: number): Promise<PollResult>,
  createPoll (creator: number, title: string, choices: PollChoice[]): Promise<PollResult>,
  updatePoll (key: number, title: string, choices: PollChoice[]): Promise<PollResult>,
  removePoll (key: number): Promise<PollResult>,
  vote (key: number, choice: string): Promise<PollResult>,
  findUserByEmail (email: string): Promise<UserResult>,
  registerUser (email: string, name: string, password: string): Promise<UserResult>,
  deleteUser (key: number): Promise<UserResult>,
  getProfile (key: number): Promise<UserResult>,
  updateProfile (key: number, name: string, theme: string): Promise<UserResult>,
};

// end of types

let db:Database | undefined;

/**
 * Connect to database
 * @param uri Database connection string
 * @returns Database instance
 */
export async function initDatabase (uri: string): Promise<Db | null> {
  db = uri.startsWith ('mongodb') ? mongo : undefined;
  const t = await db?.initDatabase (uri);
  return t || null;
}

/**
 * Close database
 * @returns Promise with no data
 */
export async function closeDatabase () {
  if (db) {
    const t = db;
    db = undefined;
    await t.closeDatabase ();
  }
}

// Polls

/**
 * Get all polls
 * @param q Query
 * @param offset Pagination offset
 * @param limit Pagination limit
 * @returns Array of polls
 */
export async function getPolls (
  q: PollQuery, offset: number, limit: number,
): Promise<PollArrayResult> {
  const t = await db?.getPolls (q, offset, limit);
  return t || { status: 500, count: 0 };
}

/**
 * Get a single poll
 * @param key Poll key
 * @returns Poll
 */
export async function getPoll (key: number): Promise<PollResult> {
  const t = await db?.getPoll (key);
  return t || { status: 500 };
}

/**
 * Create a poll
 * @param creator Creator user key
 * @param title Poll title
 * @param choices Poll choices
 * @returns Created poll
 */
export async function createPoll (
  creator: number, title: string, choices: PollChoice[],
): Promise<PollResult> {
  const t = await db?.createPoll (creator, title, choices);
  return t || { status: 500 };
}

/**
 * Update a poll
 * @param key Poll key
 * @param title Poll title
 * @param choices Poll choices
 * @returns Updated poll
 */
export async function updatePoll (
  key: number, title: string, choices: PollChoice[],
): Promise<PollResult> {
  const t = await db?.updatePoll (key, title, choices);
  return t || { status: 500 };
}

/**
 * Delete a poll
 * @param key Poll key
 * @returns Result (0 - ok, 404 - not deleted)
 */
export async function removePoll (key: number): Promise<PollResult> {
  const t = await db?.removePoll (key);
  return t || { status: 500 };
}

/**
 * Vote in a poll for a specific choice
 * @param key Poll key
 * @param choice Poll item
 * @returns Updated poll
 */
export async function vote (key: number, choice: string): Promise<PollResult> {
  const t = await db?.vote (key, choice);
  return t || { status: 500 };
}

// Users

/**
 * Find single user by email
 * @param email User email
 * @returns User result
 */
export async function findUserByEmail (email: string): Promise<UserResult> {
  const t = await db?.findUserByEmail (email);
  return t || { status: 500 };
}

/**
 * Register user, creating skeleton user document
 * @param email Email
 * @param name Name
 * @param password Password
 * @returns Result for new user
 */
export async function registerUser (
  email: string, name: string, password: string,
): Promise<UserResult> {
  const t = await db?.registerUser (email, name, password);
  return t || { status: 500 };
}

/**
 * Delete user
 * @param key User key
 * @returns Status code
 */
export async function deleteUser (key: number): Promise<UserResult> {
  const t = await db?.deleteUser (key);
  return t || { status: 500 };
}

/**
 * Get profile for user
 * @param key User key
 * @returns User profile
 */
export async function getProfile (key: number): Promise<UserResult> {
  const t = await db?.getProfile (key);
  return t || { status: 500 };
}

/**
 * Update profile for user
 * @param key User key
 * @param name Name
 * @param theme Theme
 * @returns User profile
 */
export async function updateProfile (key: number, name: string, theme: string): Promise<UserResult> {
  const t = await db?.updateProfile (key, name, theme);
  return t || { status: 500 };
}
