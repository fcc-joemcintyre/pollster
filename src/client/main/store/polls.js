import { SET_POLLS, ADD_POLL } from './constants';

let initialState = [];

export default function polls (state = initialState, action) {
  switch (action.type) {
    case SET_POLLS:
      return action.polls.slice ();

    case ADD_POLL:
      return state.concat (action.poll);

    default:
      return state;
  }
}

export function getPoll (state, _id) {
  for (let poll of state.polls) {
    if (poll._id === _id) {
      return poll;
    }
  }
  return null;
}
