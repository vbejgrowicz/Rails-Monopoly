import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PlayerCard from './PlayerCard';
import PlayerActions from './PlayerActions';
import GameActions from './GameActions';
import { subscribe } from '../../../utils/cable';
import { receiveBroadcastedPlayerData, receiveBroadcastedTurnData, updatePlayerMoney, updatePropertyOwner } from '../../../actions';

class GameDock extends React.Component {
  componentWillMount() {
    subscribe(this.props.cable, 'TurnsChannel', this.props.handleTurnsBroadcast, 'turns');
    subscribe(this.props.cable, 'PlayersChannel', this.props.handlePlayerBroadcast, 'player');
  }

  componentWillUnmount() {
    this.props.cable.disconnect();
  }

  render() {
    return (
      <div className="dock">
        <div className="players">
          {this.props.players.map(player => <PlayerCard key={player.id} player={player} />)}
        </div>
        <div className="actions-group">
          <GameActions />
          <PlayerActions />
        </div>
      </div>
    );
  }
}

GameDock.propTypes = {
  players: PropTypes.array.isRequired,
};

const mapStateToProps = ({ activeGame, cable }) => ({
  players: activeGame.players,
  cable,
});

const mapDispatchToProps = dispatch => ({
  handleTurnsBroadcast: data => dispatch(receiveBroadcastedTurnData(data)),
  handlePlayerBroadcast: data => dispatch(receiveBroadcastedPlayerData(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(GameDock);
