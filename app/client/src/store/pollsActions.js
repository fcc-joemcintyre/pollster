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

export function updatePoll (_id, title, choices) {
  return async (dispatch) => {
    await post (`/api/polls/${_id}`, { title, choices });
    await dispatch (initPolls ());
  };
}

export function deletePoll (_id) {
  return async (dispatch) => {
    await remove (`/api/polls/${_id}`);
    await dispatch (initPolls ());
  };
}

export function vote (_id, choice) {
  return async (dispatch) => {
    await post (`/api/polls/${_id}/votes/${choice}`);
    await dispatch (initPolls ());
  };
}
