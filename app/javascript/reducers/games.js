const initialState = {
  isFetching: false,
  isCreating: false,
  isJoining: false,
  items: [],
  activeGame: {},
};

const incrementPlayerCount = (player, currentGames) => (
  currentGames.map((game) => {
    if (game.id === player.game_id) {
      return { ...game, players: game.players + 1 };
    }
    return game;
  })
);

export default function games(state = initialState, action) {
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
    case 'FETCH_GAME_REQUEST':
      return {
        ...state,
        isFetching: true,
      };
    case 'FETCH_GAME_RECEIVED':
      return {
        ...state,
        isFetching: false,
        activeGame: action.payload.game,
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
    case 'JOIN_GAME_REQUEST':
      return {
        ...state,
        isJoining: true,
      };
    case 'JOIN_GAME_RECEIVED':
      return {
        ...state,
        isJoining: false,
        items: incrementPlayerCount(action.payload.player, state.items),
      };
    default:
      return state;
  }
}
