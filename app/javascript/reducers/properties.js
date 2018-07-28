const initialState = {
  isFetching: false,
  items: [],
};

export default function properties(state = initialState, action) {
  switch (action.type) {
    case 'FETCH_PROPERTIES_REQUEST':
      return { ...state, isFetching: true };
    case 'FETCH_PROPERTIES_RECEIVED':
      return { ...state, items: action.payload.properties, isFetching: false };
    default:
      return state;
  }
}
