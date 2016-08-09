import { SET_POLLS } from './constants';

const initialState = [];

export default function polls (state = initialState, action) {
  switch (action.type) {
    case SET_POLLS:
      return action.polls.slice ();

    default:
      return state;
  }
}

export function getPoll (state, _id) {
  for (const poll of state.polls) {
    if (poll._id === _id) {
      return poll;
    }
  }
  return null;
}
