
export default function currentUser(state = { isFetching: true }, action) {
  switch (action.type) {
    case 'FETCH_USER_REQUEST':
      return {
        ...state,
        isFetching: true,
      };
    case 'FETCH_USER_RECEIVED':
      return {
        ...state,
        ...action.payload.user,
        isFetching: false,
      };
    default:
      return state;
  }
}
