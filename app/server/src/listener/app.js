// @ts-check
import * as db from '../db/polls.js';
import { validatePoll } from './validators.js';

/**
  @typedef { import ('express').Request} Request
  @typedef { import ('express').Response} Response
  @typedef { import ('express').NextFunction} NextFunction
 */

/**
 * Get all polls
 * @param {Request} req Request object
 * @param {Response} res Response object
 */
export async function getPolls (req, res) {
  console.log ('INFO getPolls');
  const page = req.query.page ? Number (req.query.page) : 0;
  const limit = req.query.limit ? Number (req.query.limit) : 100;
  if (Number.isNaN (page) || Number.isNaN (limit)) {
    console.log ('ERROR getPolls (400) Invalid page or limit');
    res.status (400).json ({});
    return;
  }
  const q = {};
  if (req.query.own === 'true') {
    // @ts-ignore
    q.creator = req.user.key;
  }
  const t = await db.getPolls (q, page * limit, limit);
  if (t.status === 200) {
    res.status (200).json ({ page, count: t.count, polls: t.polls });
  } else {
    console.log (`ERROR getPolls (${t.status})`);
    res.status (t.status).json ({});
  }
}

/**
 * Get single poll
 * @param {Request} req Request object
 * @param {Response} res Response object
 */
export async function getPoll (req, res) {
  console.log ('INFO getPoll');
  const key = Number (req.params.key);
  if (Number.isNaN (key)) {
    console.log ('ERROR getPoll (400) invalid key', key);
    res.status (400).json ({});
    return;
  }
  const t = await db.getPoll (key);
  if (t.status === 200) {
    res.status (200).json (t.poll);
  } else if (t.status === 404) {
    res.status (404).json ({});
  } else {
    console.log (`ERROR getPoll (${t.status})`);
    res.status (t.status).json ({});
  }
}

/**
 * Create a new poll
 * @param {Request} req Request object
 * @param {Response} res Response object
 */
export async function createPoll (req, res) {
  console.log ('INFO createPoll', req.body);
  if (validatePoll (req.body) === false) {
    console.log ('ERROR createPoll (400) invalid body', validatePoll.errors);
    res.status (400).json ({});
  } else {
    const choices = [];
    for (const choice of req.body.choices) {
      choices.push ({ text: choice, votes: 0 });
    }
    // @ts-ignore
    const t = await db.createPoll (req.user.key, req.body.title, choices);
    if (t.status === 200) {
      console.log ('INFO addPoll ok');
      res.status (200).json (t.poll);
    } else {
      console.log (`ERROR addPoll (${t.status})`);
      res.status (t.status).json ({});
    }
  }
}

/**
 * Update a poll
 * @param {Request} req Request object
 * @param {Response} res Response object
 */
export async function updatePoll (req, res) {
  console.log ('INFO updatePoll');
  const key = Number (req.params.key);
  if (Number.isNaN (key)) {
    console.log ('ERROR updatePoll (400) invalid key', key);
    res.status (400).json ({});
  }
  if (validatePoll (req.body) === false) {
    console.log ('ERROR updatePoll (400) invalid body', validatePoll.errors);
    res.status (400).json ({});
  } else {
    const choices = [];
    for (const choice of req.body.choices) {
      choices.push ({ text: choice, votes: 0 });
    }
    const t = await db.updatePoll (key, req.body.title, choices);
    if (t.status === 200) {
      res.status (200).json ({});
    } else {
      console.log (`ERROR updatePoll (${t.status})`);
      res.status (t.status).json ({});
    }
  }
}

/**
 * Delete a poll
 * @param {Request} req Request object
 * @param {Response} res Response object
 */
export async function deletePoll (req, res) {
  console.log ('INFO deletePoll');
  const key = Number (req.params.key);
  if (Number.isNaN (key)) {
    console.log ('ERROR deletePoll (400) invalid key', key);
    res.status (400).json ({});
  }
  await db.removePoll (key);
  res.status (200).json ({});
}

/**
 * Vote in a poll
 * @param {Request} req Request object
 * @param {Response} res Response object
 */
export async function vote (req, res) {
  console.log ('INFO vote');
  const key = Number (req.params.key);
  const { choice } = req.params;
  if (Number.isNaN (key) || !choice || !(typeof (choice) === 'string')) {
    console.log ('ERROR vote (400) invalid params', key, choice);
    res.status (400).json ({});
  }
  const t = await db.vote (key, choice);
  if (t.status === 200) {
    res.status (200).json ({});
  } else {
    console.log (`ERROR vote (${t.status})`);
    res.status (t.status).json ({});
  }
}
