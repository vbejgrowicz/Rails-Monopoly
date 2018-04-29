const initialState = {
  isFetching: false,
  isUpdating: false,
  isRolling: false,
};

export default function games(state = initialState, action) {
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
    default:
      return state;
  }
}
