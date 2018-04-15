const fetchSpacesRequest = () => ({
  type: 'FETCH_SPACES_REQUEST',
});

const fetchSpacesReceived = spaces => ({
  type: 'FETCH_SPACES_RECEIVED',
  payload: { spaces },
});

export {
  fetchSpacesRequest,
  fetchSpacesReceived,
};
