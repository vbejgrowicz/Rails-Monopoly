import React from 'react';
import PropTypes from 'prop-types';

class Player extends React.Component {
  constructor() {
    super();

    this.actionRender = this.actionRender.bind(this);
  }

  actionRender() {
    const { currentUserId } = this.props;
    const { user_id } = this.props.player;
    return currentUserId === user_id ? (
      <button className="action button">Roll</button>
    ) : (
      <div className="action pending">Awaiting Roll...</div>
    );
  }

  diceRender() {
    return (
      <div className="dice-group">
        <div className={`die one`} />
        <div className={`die two`} />
      </div>
    );
  }
  render() {
    const { player, gameStarted } = this.props;
    return (
      <div className="player-data" key={player.user_id}>
        <div className={`token ${player.token}`}>
          <span className="token-tooltip">User {player.user_id}</span>
        </div>
        {gameStarted && (
          <div className="roll-group">
            {player.roll ? this.diceRender() : this.actionRender()}
          </div>
        )}
      </div>
    );
  }
}

Player.propTypes = {
  currentUserId: PropTypes.number.isRequired,
  player: PropTypes.object.isRequired,
  gameStarted: PropTypes.bool.isRequired,
};

export default Player;
