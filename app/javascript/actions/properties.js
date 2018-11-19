const fetchPropertiesRequest = () => ({
  type: 'FETCH_PROPERTIES_REQUEST',
});

const fetchPropertiesReceived = properties => ({
  type: 'FETCH_PROPERTIES_RECEIVED',
  payload: { properties },
});

const updatePropertiesOwner = players => ({
  type: 'UPDATE_PROPERTIES_OWNER',
  payload: { players },
});

export {
  fetchPropertiesRequest,
  fetchPropertiesReceived,
  updatePropertiesOwner,
};
