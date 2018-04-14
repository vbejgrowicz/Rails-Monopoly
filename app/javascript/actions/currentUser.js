const fetchUserRequest = () => ({
  type: 'FETCH_USER_REQUEST',
});

const fetchUserReceived = user => ({
  type: 'FETCH_USER_RECEIVED',
  payload: { user },
});

export {
  fetchUserRequest,
  fetchUserReceived,
};
