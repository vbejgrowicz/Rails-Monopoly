import { combineReducers } from 'redux';
import games from './games';
import serverErrors from './serverErrors';
import currentUser from './currentUser';

export default combineReducers({
  games,
  serverErrors,
  currentUser,
});
