import { combineReducers } from 'redux';
import games from './games';
import activeGame from './activeGame';
import serverErrors from './serverErrors';
import currentUser from './currentUser';
import spaces from './spaces';

export default combineReducers({
  games,
  activeGame,
  serverErrors,
  currentUser,
  spaces,
});
