import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { dieMapper } from '../../../utils/helpers';
import { get, put, apiRequest } from '../../../utils/fetch';
import { connectCable, subscribe } from '../../../utils/cable';
import { updateTurnRequest, updateTurnReceived, fetchPlayerRequest, fetchPlayerReceived,
 fetchTurnsRequest, fetchTurnsReceived, receiveBroadcastedTurnData, receiveBroadcastedPlayerData,
} from '../../../actions';

class PlayerActions extends React.Component {
  constructor() {
    super();

    this.rollDice = this.rollDice.bind(this);
    this.movePlayer = this.movePlayer.bind(this);
    this.endTurn = this.endTurn.bind(this);
    this.renderActionButton = this.renderActionButton.bind(this);
  }

  componentWillMount() {
    this.cable = connectCable();
    this.turnsChannel = subscribe(this.cable, 'TurnsChannel', this.props.handleTurnsBroadcast);
    this.playersChannel = subscribe(this.cable, 'PlayersChannel', this.props.handlePlayersBroadcast);
  }

  componentWillUnmount() {
    this.cable.disconnect();
  }

  rollDice = async () => {
    const { currentTurn } = this.props;
    const updateTurn = await this.props.updateTurn('roll', currentTurn.id)
    if (updateTurn.success) {
      this.turnsChannel.send(updateTurn.json);
    }
  }

  movePlayer = async () => {
    const { currentTurn } = this.props;
    const updateTurn = await this.props.updateTurn('move', currentTurn.id);
    if (updateTurn.success) {
      const fetchPlayer = await this.props.fetchPlayer(updateTurn.json.turn.player.id);
      if (fetchPlayer.success) {
        this.playersChannel.send(fetchPlayer.json);
      }
    }
  }

  endTurn = async () => {
    const { currentTurn } = this.props;
    const updateTurn = await this.props.updateTurn('end', currentTurn.id);
    if (updateTurn.success) {
      const fetchTurns = await this.props.fetchTurns();
      if (fetchTurns.success) {
        this.turnsChannel.send(fetchTurns.json);
      }
    }
  }

  renderActionButton() {
    const { currentTurn, activePlayer } = this.props;
    if (!currentTurn.roll.id) {
      return (
        <button className="action-btn roll" onClick={this.rollDice}>Roll</button>
      );
    } else if (currentTurn.end_space_id !== activePlayer.space_id) {
      return (
        <button className="action-btn move" onClick={this.movePlayer}>Move Token</button>
      );
    }
    return (
      <button className="action-btn end-turn" onClick={this.endTurn}>End Turn</button>
    );
  }

  render() {
    const { isActivePlayer, currentTurn } = this.props;
    const { roll } = currentTurn;
    return (
      <div className={`player-actions ${isActivePlayer ? 'active' : ''}`}>
        <div className="dice-group">
          <div className={`die ${roll.id ? dieMapper[roll.die_one] : 'one'}`} />
          <div className={`die ${roll.id ? dieMapper[roll.die_two] : 'one'}`} />
        </div>
        {this.renderActionButton()}
        <div>It's Your Turn!</div>
      </div>
    );
  }
}

PlayerActions.propTypes = {
  isActivePlayer: PropTypes.bool.isRequired,
  currentTurn: PropTypes.object.isRequired,
  updateTurn: PropTypes.func.isRequired,
  fetchPlayer: PropTypes.func.isRequired,
  fetchTurns: PropTypes.func.isRequired,
  handleTurnsBroadcast: PropTypes.func.isRequired,
  handlePlayersBroadcast: PropTypes.func.isRequired,
  activePlayer: PropTypes.object.isRequired,
};

const mapStateToProps = ({ currentUser, turns, activeGame }) => ({
  isActivePlayer: currentUser.id === turns.items[0].player.user_id,
  activePlayer: activeGame.players.find(player => player.id === turns.items[0].player.id),
  currentTurn: turns.items[0],
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  updateTurn: async (turn_action, turnId) => {
    const gameId = ownProps.match.params.id;
    dispatch(updateTurnRequest());
    const updateTurn = () => put(`/api/games/${gameId}/turns/${turnId}`, { turn_action });
    return apiRequest(updateTurn, (json) => {
      dispatch(updateTurnReceived(json.turn));
    });
  },
  fetchPlayer: async (playerId) => {
    dispatch(fetchPlayerRequest());
    const fetchPlayer = () => get(`/api/players/${playerId}`);
    return apiRequest(fetchPlayer, (json) => {
      dispatch(fetchPlayerReceived(json.player));
    });
  },
  fetchTurns: async () => {
    const gameId = ownProps.match.params.id;
    dispatch(fetchTurnsRequest());
    const getTurns = () => get(`/api/games/${gameId}/turns`);
    return apiRequest(getTurns, (json) => {
      dispatch(fetchTurnsReceived(json.turns));
    });
  },
  handleTurnsBroadcast: data => dispatch(receiveBroadcastedTurnData(data)),
  handlePlayersBroadcast: data => dispatch(receiveBroadcastedPlayerData(data))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PlayerActions));
