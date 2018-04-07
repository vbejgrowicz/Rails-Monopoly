import React from 'react';
import PropTypes from 'prop-types';

class GameItem extends React.Component {
  render() {
    const { id, host_id, created_at, players } = this.props.game;
    return (
      <div className="game-row">
        <div className="game-item id">{id}</div>
        <div className="game-item host">{host_id}</div>
        <div className="game-item created">{created_at}</div>
        <div className="game-item players">{players}</div>
        <div className="game-item join">Join This Game</div>
      </div>
    );
  }
}

GameItem.propTypes = {
  game: PropTypes.object.isRequired,
};

export default GameItem;
