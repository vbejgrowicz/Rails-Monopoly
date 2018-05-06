import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { dieMapper } from '../../../utils/helpers';
import { get, put, apiRequest } from '../../../utils/fetch';
import { updateTurnRequest, updateTurnReceived, fetchPlayerRequest, fetchPlayerReceived } from '../../../actions';

class PlayerActions extends React.Component {
  constructor() {
    super();

    this.movePlayer = this.movePlayer.bind(this);
  }

  movePlayer = async () => {
    const { currentTurn } = this.props;
    const { json } = await this.props.updateTurn('move', currentTurn.id);
    if (json.turn) {
      this.props.fetchPlayer(json.turn.player.id);
    }
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
        {roll.id ? (
          <button className="action-btn move" onClick={this.movePlayer}>Move Token</button>
        ) : (
          <button className="action-btn roll" onClick={() => this.props.updateTurn('roll', currentTurn.id)}>Roll</button>
        )}
        <div>It's Your Turn!</div>
      </div>
    );
  }
}

PlayerActions.propTypes = {
  isActivePlayer: PropTypes.bool.isRequired,
  currentTurn: PropTypes.object.isRequired,
  updateTurn: PropTypes.func.isRequired,
};

const mapStateToProps = ({ currentUser, turns }) => ({
  isActivePlayer: currentUser.id === turns.items[0].player.user_id,
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
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PlayerActions));
