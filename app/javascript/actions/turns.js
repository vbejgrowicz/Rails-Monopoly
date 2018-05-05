const fetchTurnsRequest = () => ({
  type: 'FETCH_TURNS_REQUEST',
});

const fetchTurnsReceived = turns => ({
  type: 'FETCH_TURNS_RECEIVED',
  payload: { turns },
});

export {
  fetchTurnsRequest,
  fetchTurnsReceived,
};
