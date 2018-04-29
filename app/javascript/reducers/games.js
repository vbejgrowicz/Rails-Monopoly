const initialState = {
  isFetching: false,
  isCreating: false,
  isJoining: false,
  isUpdating: false,
  isRolling: false,
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
    case 'UPDATE_GAME_REQUEST':
      return {
        ...state,
        isUpdating: true,
      };
    case 'UPDATE_GAME_RECEIVED':
      return {
        ...state,
        isUpdating: false,
        activeGame: action.payload.game,
      };
    case 'CREATE_ROLL_REQUEST':
      return {
        ...state,
        isRolling: true,
      };
    case 'CREATE_ROLL_RECEIVED':
      return {
        ...state,
        isRolling: false,
        activeGame: {
          ...state.activeGame,
          players: state.activeGame.players.map((player) => {
            if (player.id === action.payload.roll.player_id) {
              return { ...player, roll: action.payload.roll };
            }
            return player;
          }),
        },
      };
    default:
      return state;
  }
}
