/*
  Poll action creators
*/
/* eslint no-useless-return: off */
import { SET_POLLS } from './pollsConstants';
import API from './API';

export function setPolls (polls) {
  return { type: SET_POLLS, polls };
}

export function initPolls () {
  return (dispatch) => {
    return API.getPolls ().then ((polls) => {
      dispatch (setPolls (polls));
      return;
    }).catch ((err) => {
      throw err;
    });
  };
}

export function addPoll (title, choices, voteLimit, maxVotes, dateLimit, endDate) {
  return (dispatch) => {
    return API.createPoll (title, choices, voteLimit, maxVotes, dateLimit, endDate).then (() => {
      return dispatch (initPolls ()).then (() => { return; }).catch (() => { return; });
    }).catch ((err) => {
      throw err;
    });
  };
}

export function updatePoll (_id, title, choices, voteLimit, maxVotes, dateLimit, endDate) {
  return (dispatch) => {
    return API.updatePoll (_id, title, choices, voteLimit, maxVotes, dateLimit, endDate).then (() => {
      return dispatch (initPolls ()).then (() => { return; }).catch (() => { return; });
    }).catch ((err) => {
      throw err;
    });
  };
}

export function deletePoll (_id) {
  return (dispatch) => {
    return API.deletePoll (_id).then (() => {
      return dispatch (initPolls ()).then (() => { return; }).catch (() => { return; });
    }).catch ((err) => {
      throw err;
    });
  };
}

export function vote (_id, choice) {
  return (dispatch) => {
    return API.vote (_id, choice).then (() => {
      return dispatch (initPolls ()).then (() => { return; }).catch (() => { return; });
    }).catch ((err) => {
      throw err;
    });
  };
}
