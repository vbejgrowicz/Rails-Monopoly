const fetchTurnsRequest = () => ({
  type: 'FETCH_TURNS_REQUEST',
});

const fetchTurnsReceived = turns => ({
  type: 'FETCH_TURNS_RECEIVED',
  payload: { turns },
});

const updateTurnRequest = () => ({
  type: 'UPDATE_TURN_REQUEST',
});

const updateTurnReceived = turn => ({
  type: 'UPDATE_TURN_RECEIVED',
  payload: { turn },
});

export {
  fetchTurnsRequest,
  fetchTurnsReceived,
  updateTurnRequest,
  updateTurnReceived,
};
