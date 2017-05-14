/*
  Poll action creators
*/
import { SET_POLLS } from './pollsConstants';
import API from './API';

export function setPolls (polls) {
  return { type: SET_POLLS, polls };
}

export function initPolls () {
  return async (dispatch) => {
    try {
      const polls = await API.getPolls ();
      dispatch (setPolls (polls));
    } catch (err) {
      throw err;
    }
  };
}

export function addPoll (title, choices, voteLimit, maxVotes, dateLimit, endDate) {
  return async (dispatch) => {
    try {
      await API.createPoll (title, choices, voteLimit, maxVotes, dateLimit, endDate);
      await dispatch (initPolls ());
    } catch (err) {
      throw err;
    }
  };
}

export function updatePoll (_id, title, choices, voteLimit, maxVotes, dateLimit, endDate) {
  return async (dispatch) => {
    try {
      await API.updatePoll (_id, title, choices, voteLimit, maxVotes, dateLimit, endDate);
      await dispatch (initPolls ());
    } catch (err) {
      throw err;
    }
  };
}

export function deletePoll (_id) {
  return async (dispatch) => {
    try {
      await API.deletePoll (_id);
      await dispatch (initPolls ());
    } catch (err) {
      throw err;
    }
  };
}

export function vote (_id, choice) {
  return async (dispatch) => {
    try {
      await API.vote (_id, choice);
      await dispatch (initPolls ());
    } catch (err) {
      throw err;
    }
  };
}
