const receiveBroadcastedTurnData = data => ({
  type: 'RECEIVE_BROADCASTED_TURN_DATA',
  payload: data,
});

const receiveBroadcastedPlayerData = data => ({
  type: 'RECEIVE_BROADCASTED_PLAYER_DATA',
  payload: data,
});

export {
  receiveBroadcastedTurnData,
  receiveBroadcastedPlayerData,
};
