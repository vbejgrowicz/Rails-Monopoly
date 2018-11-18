import { combineReducers } from 'redux';
import games from './games';
import activeGame from './activeGame';
import serverErrors from './serverErrors';
import currentUser from './currentUser';
import spaces from './spaces';
import turns from './turns';
import properties from './properties';
import { connectCable } from '../utils/cable';

export default combineReducers({
  games,
  activeGame,
  serverErrors,
  currentUser,
  spaces,
  turns,
  properties,
  cable: (state = connectCable()) => state,
});
