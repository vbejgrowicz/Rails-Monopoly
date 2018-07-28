const fetchPropertiesRequest = () => ({
  type: 'FETCH_PROPERTIES_REQUEST',
});

const fetchPropertiesReceived = properties => ({
  type: 'FETCH_PROPERTIES_RECEIVED',
  payload: { properties },
});

export {
  fetchPropertiesRequest,
  fetchPropertiesReceived,
};
