import { Collection, Db, MongoServerError } from 'mongodb';
import { createHash } from '../auth/hash.js';
import { getNextSequence } from './counters.js';

type User = {
  key: number,
  email: string,
  name: string,
  theme: string,
  hash: string,
  salt: string,
};

type UserResult = {
  status: number,
  user?: User | null,
};

let c: Collection<User>;

/**
 * Initialize collection
 * @param db MongoDB db instance object
 */
export function initUsers (db: Db) {
  c = db.collection ('users');
}

/**
 * Find single user by email
 * @param email User email
 * @returns User result
 */
export async function findUserByEmail (email: string): Promise<UserResult> {
  const user = await c.findOne ({ email });
  return ({
    status: user ? 200 : 404,
    user,
  });
}

/**
 * Register user, creating skeleton user document
 * @param email Email
 * @param name Name
 * @param password Password
 * @returns Result for new user
 */
export async function registerUser (
  email: string,
  name: string,
  password: string
): Promise<UserResult> {
  const key = await getNextSequence ('users');
  if (!key) {
    return ({ status: 500 });
  }

  try {
    const hash = createHash (password);
    const t = await c.insertOne (
      { key, email, name, theme: 'light', hash: hash.hash, salt: hash.salt },
    );
    if (t.acknowledged) {
      const user = await c.findOne (t.insertedId);
      return ({ status: 200, user });
    } else {
      return ({ status: 400 });
    }
  } catch (err) {
    if (err instanceof MongoServerError) {
      if (err.code === 11000) {
        return ({ status: 409 });
      }
    }
    return ({ status: 500 });
  }
}

/**
 * Delete user
 * @param key User key
 * @returns Status code
 */
export async function deleteUser (key: number): Promise<UserResult> {
  try {
    await c.deleteOne ({ key });
    return { status: 200 };
  } catch (err) {
    return { status: 500 };
  }
}

/**
 * Get profile for user
 * @param key User key
 * @returns User profile
 */
export async function getProfile (key: number): Promise<UserResult> {
  const user = await c.findOne ({ key });
  return ({
    status: user ? 200 : 404,
    user,
  });
}

/**
 * Update profile for user
 * @param key User key
 * @param name Name
 * @param theme Theme
 * @returns User profile
 */
export async function updateProfile (key: number, name: string, theme: string): Promise<UserResult> {
  const user = await c.findOneAndUpdate (
    { key },
    { $set: { name, theme } },
    { returnDocument: 'after' },
  );
  return ({
    status: user.value ? 200 : 404,
    user: user.value,
  });
}
