import React from 'react';
import GameTable from './Lobby/GameTable';
import ServerError from './ServerError';

const Main = () => (
  [
    <ServerError key="1" />,
    <GameTable key="2" />,
  ]
);

export default Main;
