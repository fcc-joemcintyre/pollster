import { Collection, Db } from 'mongodb';
import { getNextSequence } from './counters.js';

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

let c: Collection<Poll>;

/**
 * Initialize collection
 * @param db MongoDB db instance object
 */
export function initPolls (db: Db) {
  c = db.collection ('polls');
}

/**
 * Get all polls
 * @param q Query
 * @param offset Pagination offset
 * @param limit Pagination limit
 * @returns Array of polls
 */
export async function getPolls (
  q: PollQuery,
  offset: number,
  limit: number
): Promise<PollArrayResult> {
  try {
    const t = c.find (q);
    const count = await t.count ();
    const polls = await t.skip (offset).limit (limit).toArray ();
    return ({ status: 200, count, polls });
  } catch (err) {
    return ({ status: 500, count: 0 });
  }
}

/**
 * Get a single poll
 * @param key Poll key
 * @returns Poll
 */
export async function getPoll (key: number): Promise<PollResult> {
  try {
    const poll = await c.findOne ({ key }) as Poll;
    return ({
      status: poll ? 200 : 404,
      poll,
    });
  } catch (err) {
    return ({ status: 500 });
  }
}

/**
 * Create a poll
 * @param creator Creator user key
 * @param title Poll title
 * @param choices Poll choices
 * @returns Created poll
 */
export async function createPoll (
  creator: number,
  title: string,
  choices: PollChoice[]
): Promise<PollResult> {
  const key = await getNextSequence ('polls');
  if (!key) {
    return ({ status: 500, poll: undefined });
  }

  const t = await c.insertOne (
    { key, creator, title, choices },
  );
  if (t.acknowledged) {
    const poll = await c.findOne ({ key }) as Poll;
    return ({
      status: 200,
      poll,
    });
  } else {
    return ({ status: 500, poll: undefined });
  }
}

/**
 * Update a poll
 * @param key Poll key
 * @param title Poll title
 * @param choices Poll choices
 * @returns Updated poll
 */
export async function updatePoll (
  key: number,
  title: string,
  choices: PollChoice[]
): Promise<PollResult> {
  const t = await c.findOneAndUpdate (
    { key },
    { $set: { title, choices } },
    { returnDocument: 'after' }
  );
  return ({
    status: t.value ? 200 : 500,
    poll: t.value,
  });
}

/**
 * Delete a poll
 * @param key Poll key
 * @returns Result (0 - ok, 404 - not deleted)
 */
export function removePoll (key: number): PollResult {
  try {
    c.deleteOne ({ key });
    return { status: 200 };
  } catch (err) {
    return { status: 404 };
  }
}

/**
 * Vote in a poll for a specific choice
 * @param key Poll key
 * @param choice Poll item
 * @returns Updated poll
 */
export async function vote (key: number, choice: string): Promise<PollResult> {
  const t = await c.findOneAndUpdate (
    { key, 'choices.text': choice },
    { $inc: { 'choices.$.votes': 1 } },
    { returnDocument: 'after' },
  );
  return ({
    status: t.value ? 200 : 500,
    poll: t.value,
  });
}
