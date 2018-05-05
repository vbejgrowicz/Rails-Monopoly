export default function turns(state = { isFetching: true, items: [] }, action) {
  switch (action.type) {
    case 'FETCH_TURNS_REQUEST':
      return {
        ...state,
        isFetching: true,
      };
    case 'FETCH_TURNS_RECEIVED':
      return {
        ...state,
        items: action.payload.turns,
        isFetching: false,
      };
    case 'UPDATE_TURN_REQUEST':
      return {
        ...state,
        isUpdating: true,
      };
    case 'UPDATE_TURN_RECEIVED':
      return {
        ...state,
        items: state.items.map((turn) => {
          if (turn.id === action.payload.turn.id) {
            return { ...turn, ...action.payload.turn };
          }
          return turn;
        }),
        isUpdating: false,
      };
    default:
      return state;
  }
}
