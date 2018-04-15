import { combineReducers } from 'redux';
import games from './games';
import serverErrors from './serverErrors';
import currentUser from './currentUser';
import spaces from './spaces';

export default combineReducers({
  games,
  serverErrors,
  currentUser,
  spaces,
});
