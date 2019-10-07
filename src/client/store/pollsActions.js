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
    const polls = await API.getPolls ();
    dispatch (setPolls (polls));
  };
}

export function addPoll (title, choices) {
  return async (dispatch) => {
    await API.createPoll (title, choices);
    await dispatch (initPolls ());
  };
}

export function updatePoll (_id, title, choices) {
  return async (dispatch) => {
    await API.updatePoll (_id, title, choices);
    await dispatch (initPolls ());
  };
}

export function deletePoll (_id) {
  return async (dispatch) => {
    await API.deletePoll (_id);
    await dispatch (initPolls ());
  };
}

export function vote (_id, choice) {
  return async (dispatch) => {
    await API.vote (_id, choice);
    await dispatch (initPolls ());
  };
}
