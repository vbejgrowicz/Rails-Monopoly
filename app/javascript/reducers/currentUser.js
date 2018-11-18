export default function currentUser(state = { isFetching: true }, action) {
  switch (action.type) {
    case 'FETCH_USER_REQUEST':
      return {
        ...state,
        isFetching: true,
      };
    case 'FETCH_USER_RECEIVED':
      return {
        ...state,
        ...action.payload.user,
        isFetching: false,
      };
    case 'JOIN_GAME_RECEIVED':
      return {
        ...state,
        active_game_ids: state.active_game_ids.concat(action.payload.player.game_id),
      };
    case 'CREATE_GAME_RECEIVED':
      return {
        ...state,
        active_game_ids: state.active_game_ids.concat(action.payload.game.id),
      };
    default:
      return state;
  }
}
