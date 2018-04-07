export default function games(state = { items: [], isFetching: false, isCreating: false }, action) {
  switch (action.type) {
    case 'FETCH_GAMES_REQUEST':
      return {
        ...state,
        isFetching: true,
      };
    case 'FETCH_GAMES_RECEIVED':
      return {
        ...state,
        items: action.payload.games,
        isFetching: false,
      };
    case 'CREATE_GAME_REQUEST':
      return {
        ...state,
        isCreating: true,
      };
    case 'CREATE_GAME_RECEIVED':
      return {
        ...state,
        items: state.items.concat(action.payload.game),
        isCreating: false,
      };
    default:
      return state;
  }
}
