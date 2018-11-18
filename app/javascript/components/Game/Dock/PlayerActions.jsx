import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { dieMapper } from '../../../utils/helpers';
import { get, put, apiRequest } from '../../../utils/fetch';
import { updateTurnRequest, updateTurnReceived, fetchPlayerRequest, fetchPlayerReceived,
 fetchTurnsRequest, fetchTurnsReceived, receiveBroadcastedTurnData, receiveBroadcastedPlayerData,
import { getSubscription } from '../../../utils/cable';
} from '../../../actions';

class PlayerActions extends React.Component {
  constructor(props) {
    super(props);

    this.rollDice = this.rollDice.bind(this);
    this.movePlayer = this.movePlayer.bind(this);
    this.endTurn = this.endTurn.bind(this);
    this.renderActionButton = this.renderActionButton.bind(this);

    this.turnsChannel = getSubscription(props.cable, 'turns');
    this.playerChannel = getSubscription(props.cable, 'player');
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
        this.playerChannel.send(fetchPlayer.json);
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
    return isActivePlayer ? (
      <div className="player-actions">
        <div className="dice-group">
          <div className={`die ${roll.id ? dieMapper[roll.die_one] : 'one'}`} />
          <div className={`die ${roll.id ? dieMapper[roll.die_two] : 'one'}`} />
        </div>
        {this.renderActionButton()}
        <div className="action-text">It's Your Turn!</div>
      </div>
    ) : (
      <div className="player-actions">
        <div className="action-text">It's Not Your Turn!</div>
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
  activePlayer: PropTypes.object.isRequired,
};

const mapStateToProps = ({ cable, currentUser, turns, activeGame }) => ({
  isActivePlayer: currentUser.id === turns.items[0].player.user_id,
  activePlayer: activeGame.players.find(player => player.id === turns.items[0].player.id),
  currentTurn: turns.items[0],
  cable: cable,
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
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PlayerActions));
