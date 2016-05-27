'use strict';
const db = require ('./db');
const promiseTry = require ('./promiseTry');

// Initialize listeners (currently empty)
function init () {
}

function getPolls (req, res) {
  console.log ('getPolls');
  promiseTry (() => {
    return db.getPolls ();
  }).then (polls => {
    res.status (200).json (polls);
  }).catch (err => {
    console.log ('  getPolls error', err);
    res.status (500).json ({});
  });
}

function getPoll (req, res) {
  console.log ('getPoll', req.params._id);
  promiseTry (() => {
    return db.getPoll (req.params._id);
  }).then (poll => {
    if (poll) {
      res.status (200).json (poll);
    } else {
      res.status (404).json ({});
    }
  }).catch (err => {
    console.log ('  getPoll error', err);
    res.status (500).json ({});
  });
}

function addPoll (req, res) {
  console.log ('addPoll', req.body);
  let choices = [];
  for (let choice of req.body.choices) {
    choices.push ({text: choice, votes: 0});
  }
  let poll = {
    creator: req.user.username,
    title: req.body.title,
    choices: choices
  };
  promiseTry (() => {
    return db.insertPoll (poll);
  }).then (result => {
    console.log ('  addPoll added', result.ops[0]._id);
    res.status (200).json ({ _id: result.ops[0]._id });
  }).catch (err => {
    console.log ('  addPoll error', err);
    res.status (500).json ({});
  });
}

function updatePoll (req, res) {
  console.log ('updatePoll', req.body);
  let choices = [];
  for (let choice of req.body.choices) {
    choices.push ({text: choice, votes: 0});
  }
  let poll = {
    creator: req.user.username,
    title: req.body.title,
    choices: choices
  };
  promiseTry (() => {
    return db.updatePoll (req.body._id, poll);
  }).then (() => {
    res.status (200).json ({});
  }).catch (err => {
    console.log ('updatePoll error', err);
    res.status (500).json ({});
  });
}

function deletePoll (req, res) {
  console.log ('deletePoll', req.params._id);
  promiseTry (() => {
    return db.removePoll (req.params._id);
  }).then (() => {
    res.status (200).json ({});
  }).catch (err => {
    console.log ('  deletePoll error', err);
    res.status (500).json ({});
  });
}

function vote (req, res) {
  console.log ('vote', req.params._id, req.params.choice);
  promiseTry (() => {
    return db.vote (req.params._id, req.params.choice);
  }).then (() => {
    res.status (200).json ({});
  }).catch (err => {
    console.log ('  vote error', err);
    res.status (500).json ({});
  });
}

exports.init = init;
exports.getPolls = getPolls;
exports.getPoll = getPoll;
exports.addPoll = addPoll;
exports.updatePoll = updatePoll;
exports.deletePoll = deletePoll;
exports.vote = vote;
