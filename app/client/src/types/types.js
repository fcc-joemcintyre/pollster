// @ts-check
/**
  @typedef {Object} PollChoice
  @property {string} text
  @property {number} votes

  @typedef {Object} Poll
  @property {number} key
  @property {number} creator
  @property {string} title
  @property {PollChoice[]} choices

  @typedef {Object} PollResponse
  @property {number} count
  @property {Poll[]} polls

  @typedef {Object} AuthResponse
  @property {number} key
  @property {string} theme
*/

// dummy function for Typescript processor
export function dummy () { /* no-op */ }
