import { get, post, remove } from './util/jsonFetch';
import { SET_POLLS } from './pollsConstants';

export function setPolls (polls) {
  return { type: SET_POLLS, polls };
}

export function initPolls () {
  return async (dispatch) => {
    const polls = await get ('/api/polls');
    dispatch (setPolls (polls));
  };
}

export function addPoll (title, choices) {
  return async (dispatch) => {
    await post ('/api/polls', { title, choices });
    await dispatch (initPolls ());
  };
}

export function updatePoll (key, title, choices) {
  return async (dispatch) => {
    await post (`/api/polls/${key}`, { title, choices });
    await dispatch (initPolls ());
  };
}

export function deletePoll (key) {
  return async (dispatch) => {
    await remove (`/api/polls/${key}`);
    await dispatch (initPolls ());
  };
}

export function vote (key, choice) {
  return async (dispatch) => {
    await post (`/api/polls/${key}/votes/${choice}`);
    await dispatch (initPolls ());
  };
}
