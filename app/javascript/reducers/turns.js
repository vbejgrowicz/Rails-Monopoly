export default function turns(state = { isFetching: true, items: [] }, action) {
  const updateHandler = (turn) => {
    if (turn.id === action.payload.turn.id) {
      return { ...turn, ...action.payload.turn };
    }
    return turn;
  };
  const updateNestedHandler = (turn) => {
    if (turn.id === action.payload.turn_action.turn_id) {
      return {
        ...turn,
        actions: turn.actions.map((turn_act) => {
          if (turn_act.id === action.payload.turn_action.id) {
            return action.payload.turn_action;
          }
          return turn_act;
        }),
      };
    }
    return turn;
  };
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
        items: state.items.map(updateHandler),
        isUpdating: false,
      };
    case 'UPDATE_TURN_ACTION_REQUEST':
      return {
        ...state,
        isUpdating: true,
      };
    case 'UPDATE_TURN_ACTION_RECEIVED':
      return {
        ...state,
        items: state.items.map(updateNestedHandler),
        isUpdating: false,
      };
    case 'RECEIVE_BROADCASTED_TURN_DATA':
      if (action.payload.turn) {
        return { ...state, items: state.items.map(updateHandler) };
      }
      if (action.payload.turns) {
        return { ...state, items: action.payload.turns };
      }
      return state;
    default:
      return state;
  }
}
