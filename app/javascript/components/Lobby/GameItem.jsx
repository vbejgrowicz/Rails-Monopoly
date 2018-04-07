import React from 'react';

class GameItem extends React.Component {
  render() {
    const { id, host_id, created_at, players } = this.props.game;
    return (
      <div className="game-row">
        <div className="game-item id">{id}</div>
        <div className="game-item host">{host_id}</div>
        <div className="game-item created">{created_at}</div>
        <div className="game-item players">{players}</div>
        <div className="game-item join">join</div>
      </div>
    );
  }
}

export default GameItem;
