import fs from 'fs';
import Ajv from 'ajv';
import * as db from './db.js';

// object holding validator instance and pre-compiled schemas
const validator = {};

// Initialize listeners
export function init () {
  validator.ajv = new Ajv ();
  const schemaPoll = fs.readFileSync ('./dist/schema/poll.json');
  validator.poll = validator.ajv.compile (schemaPoll);
}

export async function getPolls (req, res) {
  console.log ('INFO getPolls');
  try {
    const polls = await db.getPolls ();
    res.status (200).json (polls);
  } catch (err) {
    console.log ('ERROR getPolls', err);
    res.status (500).json ({});
  }
}

export async function getPoll (req, res) {
  console.log ('INFO getPoll', req.params._id);
  try {
    const poll = await db.getPoll (req.params._id);
    if (poll) {
      res.status (200).json (poll);
    } else {
      res.status (404).json ({});
    }
  } catch (err) {
    console.log ('ERROR getPoll', err);
    res.status (500).json ({});
  }
}

export async function addPoll (req, res) {
  console.log ('INFO addPoll', req.body);
  if (validator.poll (req.body) === false) {
    console.log ('ERROR addPoll (400) invalid body', validator.poll.errors);
    res.status (400).json ({});
  } else {
    const choices = [];
    for (const choice of req.body.choices) {
      choices.push ({ text: choice, votes: 0 });
    }
    const poll = {
      creator: req.user.username,
      title: req.body.title,
      choices,
    };
    try {
      const data = await db.insertPoll (poll);
      console.log ('INFO addPoll ok', data.ops[0]._id);
      res.status (200).json ({ _id: data.ops[0]._id });
    } catch (err) {
      console.log ('ERROR addPoll', err);
      res.status (500).json ({});
    }
  }
}

export async function updatePoll (req, res) {
  console.log ('INFO updatePoll', req.body);
  if (validator.poll (req.body) === false) {
    console.log ('ERROR updatePoll (400) invalid body', validator.poll.errors);
    res.status (400).json ({});
  } else {
    const choices = [];
    for (const choice of req.body.choices) {
      choices.push ({ text: choice, votes: 0 });
    }
    const poll = {
      creator: req.user.username,
      title: req.body.title,
      choices,
    };
    try {
      await db.updatePoll (req.params._id, poll);
      res.status (200).json ({});
    } catch (err) {
      console.log ('ERROR updatePoll', err);
      res.status (500).json ({});
    }
  }
}

export async function deletePoll (req, res) {
  console.log ('INFO deletePoll', req.params._id);
  try {
    await db.removePoll (req.params._id);
    res.status (200).json ({});
  } catch (err) {
    console.log ('ERROR deletePoll', err);
    res.status (500).json ({});
  }
}

export async function vote (req, res) {
  console.log ('INFO vote', req.params._id, req.params.choice);
  try {
    await db.vote (req.params._id, req.params.choice);
    res.status (200).json ({});
  } catch (err) {
    console.log ('ERROR vote', err);
    res.status (500).json ({});
  }
}
