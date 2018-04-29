import React from 'react';
import PropTypes from 'prop-types';

class PlayerCard extends React.Component {
  render() {
    const { token, username } = this.props.player;
    return (
      <div className="player-card">
        <div className={`token ${token}`} />
        <div className="player-name">{username}</div>
        <div className="player-money">$1500</div>
      </div>
    );
  }
}

PlayerCard.propTypes = {
  player: PropTypes.object.isRequired,
};

export default PlayerCard;
