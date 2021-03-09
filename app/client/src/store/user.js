import { SET_AUTHENTICATED, SET_PROFILE } from './userConstants';

const initialState = {
  authenticated: false,
  key: 0,
  name: '',
  email: '',
  theme: '',
};

export default function user (state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      console.log (1, action);
      return ({
        ...state,
        authenticated: action.authenticated,
        key: action.key,
      });

    case SET_PROFILE:
      return ({
        ...state,
        name: action.name,
        email: action.email,
        theme: action.theme,
      });

    default:
      return state;
  }
}
