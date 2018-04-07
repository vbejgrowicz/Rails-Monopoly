const fetchGamesRequest = () => ({
  type: 'FETCH_GAMES_REQUEST',
});

const fetchGamesReceived = games => ({
  type: 'FETCH_GAMES_RECEIVED',
  payload: { games },
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

export {
  fetchGamesRequest,
  fetchGamesReceived,
  createGameRequest,
  createGameReceived,
  joinGameRequest,
  joinGameReceived,
};
