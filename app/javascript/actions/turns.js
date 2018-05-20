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

const updateTurnActionRequest = () => ({
  type: 'UPDATE_TURN_ACTION_REQUEST',
});

const updateTurnActionReceived = turn_action => ({
  type: 'UPDATE_TURN_ACTION_RECEIVED',
  payload: { turn_action },
});

export {
  fetchTurnsRequest,
  fetchTurnsReceived,
  updateTurnRequest,
  updateTurnReceived,
  updateTurnActionRequest,
  updateTurnActionReceived,
};
