const fetchPropertiesRequest = () => ({
  type: 'FETCH_PROPERTIES_REQUEST',
});

const fetchPropertiesReceived = properties => ({
  type: 'FETCH_PROPERTIES_RECEIVED',
  payload: { properties },
});

const updatePropertyOwner = (player_id, property_id) => ({
  type: 'UPDATE_PROPERTY_OWNER',
  payload: { player_id, property_id },
});

export {
  fetchPropertiesRequest,
  fetchPropertiesReceived,
  updatePropertyOwner,
};
