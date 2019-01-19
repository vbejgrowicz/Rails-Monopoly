import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { dieMapper } from '../../../utils/helpers';
import { put, apiRequest } from '../../../utils/fetch';
import { updateTurnRequest } from '../../../actions';

class PlayerActions extends React.Component {
  constructor(props) {
    super(props);

    this.rollDice = this.rollDice.bind(this);
    this.movePlayer = this.movePlayer.bind(this);
    this.endTurn = this.endTurn.bind(this);
    this.renderActionButton = this.renderActionButton.bind(this);
  }

  rollDice = () => {
    const { currentTurn } = this.props;
    this.props.updateTurn('roll', currentTurn.id);
  }

  movePlayer = () => {
    const { currentTurn } = this.props;
    this.props.updateTurn('move', currentTurn.id);
  }

  endTurn = () => {
    const { currentTurn } = this.props;
    this.props.updateTurn('end', currentTurn.id);
  }

  renderActionButton() {
    const { currentTurn, activePlayer } = this.props;
    if (!currentTurn.roll.id) {
      return (
        <button className="action-btn roll" onClick={this.rollDice}>Roll</button>
      );
    }
    if (currentTurn.end_space_id !== activePlayer.space_id) {
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
    return apiRequest(updateTurn);
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PlayerActions));
