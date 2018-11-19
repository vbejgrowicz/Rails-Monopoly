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
    case 'UPDATE_PROPERTIES_OWNER':
      return {
        ...state,
        items: state.items.map((item) => {
          const propertyToUpdate = action.payload.players.find(player => player.property_id === item.id);
          if (propertyToUpdate) {
            return { ...item, owner_id: propertyToUpdate.player_id };
          }
          return item;
        }),
      };
    default:
      return state;
  }
}
