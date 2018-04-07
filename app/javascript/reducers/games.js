export default function games(state = { items: [], isFetching: false }, action) {
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
    default:
      return state;
  }
}
