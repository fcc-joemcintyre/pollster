import { combineReducers } from 'redux';
import user from './user';
import polls from './polls';

const rootReducer = combineReducers ({
  user,
  polls,
});

export default rootReducer;
