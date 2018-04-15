export default function spaces(state = { isFetching: true, items: [] }, action) {
  switch (action.type) {
    case 'FETCH_SPACES_REQUEST':
      return {
        ...state,
        isFetching: true,
      };
    case 'FETCH_SPACES_RECEIVED':
      return {
        ...state,
        items: action.payload.spaces,
        isFetching: false,
      };
    default:
      return state;
  }
}
