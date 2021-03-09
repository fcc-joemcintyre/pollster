import { SET_POLLS } from './pollsConstants';

const initialState = [];

export default function polls (state = initialState, action) {
  switch (action.type) {
    case SET_POLLS:
      return action.polls.slice ();

    default:
      return state;
  }
}

export function getPoll (state, key) {
  return state.polls.find ((a) => a.key === key) || null;
}
