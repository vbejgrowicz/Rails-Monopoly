import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PlayerCard from './PlayerCard';
import PlayerActions from './PlayerActions';
import GameActions from './GameActions';
import { subscribe } from '../../../utils/cable';
import { receiveBroadcastedPlayerData, receiveBroadcastedTurnData, updatePlayersMoney, updatePropertiesOwner } from '../../../actions';

class GameDock extends React.Component {
  componentWillMount() {
    subscribe(this.props.cable, 'TurnsChannel', this.props.handleTurnsBroadcast);
    subscribe(this.props.cable, 'PlayersChannel', this.props.handlePlayerBroadcast);
    subscribe(this.props.cable, 'PlayersMoneyChannel', this.props.handlePlayerMoneyBroadcast);
    subscribe(this.props.cable, 'PropertiesChannel', this.props.handlePropertyOwnerBroadcast);
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
  cable: PropTypes.object.isRequired,
  handleTurnsBroadcast: PropTypes.func.isRequired,
  handlePlayerBroadcast: PropTypes.func.isRequired,
  handlePlayerMoneyBroadcast: PropTypes.func.isRequired,
  handlePropertyOwnerBroadcast: PropTypes.func.isRequired,
};

const mapStateToProps = ({ activeGame, cable }) => ({
  players: activeGame.players,
  cable,
});

const mapDispatchToProps = dispatch => ({
  handleTurnsBroadcast: data => dispatch(receiveBroadcastedTurnData(data)),
  handlePlayerBroadcast: data => dispatch(receiveBroadcastedPlayerData(data)),
  handlePlayerMoneyBroadcast: data => dispatch(updatePlayersMoney(data.players)),
  handlePropertyOwnerBroadcast: data => dispatch(updatePropertiesOwner(data.players)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameDock);
