import { combineReducers } from 'redux';
import games from './games';
import serverErrors from './serverErrors';

export default combineReducers({
  games,
  serverErrors,
});
