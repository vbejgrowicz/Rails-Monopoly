const initialState = {
  isFetching: false,
  isUpdating: false,
  isRolling: false,
};

export default function activeGame(state = initialState, action) {
  const updatePlayer = (player) => {
    if (player.id === action.payload.player.id) {
      return action.payload.player;
    }
    return player;
  };

  const updatePlayerRoll = (player) => {
    if (player.id === action.payload.roll.player_id) {
      return { ...player, roll: action.payload.roll };
    }
    return player;
  };

  switch (action.type) {
    case 'FETCH_GAME_REQUEST':
      return {
        ...state,
        isFetching: true,
      };
    case 'FETCH_GAME_RECEIVED':
      return {
        ...state,
        ...action.payload.game,
        isFetching: false,
      };
    case 'UPDATE_GAME_REQUEST':
      return {
        ...state,
        isUpdating: true,
      };
    case 'UPDATE_GAME_RECEIVED':
      return {
        ...state,
        ...action.payload.game,
        isUpdating: false,
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
        players: state.players.map(updatePlayerRoll),
      };
    case 'FETCH_PLAYER_REQUEST':
      return {
        ...state,
        isUpdating: true,
      };
    case 'FETCH_PLAYER_RECEIVED':
      return {
        ...state,
        isUpdating: false,
        players: state.players.map(updatePlayer),
      };
    case 'RECEIVE_BROADCASTED_PLAYER_DATA':
      if (action.payload.player) {
        return { ...state, players: state.players.map(updatePlayer) };
      }
      return state;
    default:
      return state;
  }
}
