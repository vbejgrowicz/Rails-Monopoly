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
    case 'UPDATE_PROPERTY_OWNER':
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.id === action.payload.property_id) {
            return { ...item, owner_id: action.payload.player_id };
          }
          return item;
        }),
      };
    default:
      return state;
  }
}
