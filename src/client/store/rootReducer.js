import {combineReducers} from 'redux';
import user from '../account/store/user';
import polls from '../main/store/polls';

const rootReducer = combineReducers ({
  user,
  polls
});

export default rootReducer;
