import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class PlayerCard extends React.Component {
  render() {
    const { token, username, id, money } = this.props.player;
    const { activePlayerId } = this.props;
    return (
      <div className={`player-card player-color ${token} ${activePlayerId === id ? 'active' : ''}`}>
        <div className={`token ${token}`} />
        <div className="player-name">{username}</div>
        <div className="player-money">${money}</div>
      </div>
    );
  }
}

PlayerCard.propTypes = {
  player: PropTypes.object.isRequired,
  activePlayerId: PropTypes.number.isRequired,
};

const mapStateToProps = ({ turns }) => ({
  activePlayerId: turns.items[0].player.id,
});

export default connect(mapStateToProps, null)(PlayerCard);
