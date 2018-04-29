const fetchGamesRequest = () => ({
  type: 'FETCH_GAMES_REQUEST',
});

const fetchGamesReceived = games => ({
  type: 'FETCH_GAMES_RECEIVED',
  payload: { games },
});

const fetchGameRequest = id => ({
  type: 'FETCH_GAME_REQUEST',
  payload: id,
});

const fetchGameReceived = game => ({
  type: 'FETCH_GAME_RECEIVED',
  payload: { game },
});

const createGameRequest = () => ({
  type: 'CREATE_GAME_REQUEST',
});

const createGameReceived = game => ({
  type: 'CREATE_GAME_RECEIVED',
  payload: { game },
});

const joinGameRequest = () => ({
  type: 'JOIN_GAME_REQUEST',
});

const joinGameReceived = player => ({
  type: 'JOIN_GAME_RECEIVED',
  payload: { player },
});

const updateGameRequest = () => ({
  type: 'UPDATE_GAME_REQUEST',
});

const updateGameReceived = game => ({
  type: 'UPDATE_GAME_RECEIVED',
  payload: { game },
});

export {
  fetchGamesRequest,
  fetchGamesReceived,
  fetchGameRequest,
  fetchGameReceived,
  createGameRequest,
  createGameReceived,
  joinGameRequest,
  joinGameReceived,
  updateGameRequest,
  updateGameReceived,
};
