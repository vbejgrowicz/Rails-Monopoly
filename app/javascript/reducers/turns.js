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
    default:
      return state;
  }
}
