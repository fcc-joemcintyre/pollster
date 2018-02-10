import { SET_AUTHENTICATED, SET_PROFILE } from './userConstants';

const initialState = {
  authenticated: false,
  username: '',
  name: '',
  email: '',
  theme: '',
};

export default function user (state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return Object.assign ({}, state, {
        authenticated: action.authenticated,
        username: action.username,
      });

    case SET_PROFILE:
      return Object.assign ({}, state, {
        name: action.name,
        email: action.email,
        theme: action.theme,
      });

    default:
      return state;
  }
}
