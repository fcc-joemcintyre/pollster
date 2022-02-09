// @ts-check
/**
  @typedef {Object} User
  @property {number} key
  @property {string} email
  @property {string} name
  @property {string} theme
  @property {string} hash
  @property {string} salt

  @typedef {Object} UserResult
  @property {number} status
  @property {User=} user

  @typedef {Object} PollChoice
  @property {string} text
  @property {number} votes

  @typedef {Object} Poll
  @property {string} creator
  @property {string} title
  @property {PollChoice[]} choices

  @typedef {Object} PollResult
  @property {number} status
  @property {Poll=} poll

  @typedef {Object} PollArrayResult
  @property {number} status
  @property {number} count
  @property {Poll[]=} polls

  @typedef {Object} Hash
  @property {string} hash
  @property {string} salt
*/

// dummy function so Intellisense sees file as a module for imports
export function dummy () { /* no op */ }
