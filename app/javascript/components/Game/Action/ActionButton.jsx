import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { apiRequest, get, put } from '../../../utils/fetch';
import { fetchTurnActionsRequest, fetchTurnActionsReceived, updateTurnActionRequest,
  updateTurnActionReceived,
} from '../../../actions';

class ActionButton extends React.Component {
  onClickDraw = async (e) => {
    const { turnAction } = this.props;
    await this.props.updateTurnAction(turnAction)(e);
    this.props.fetchTurnActions(turnAction.turn_id);
  }

  render() {
    const { turnAction } = this.props;
    if (turnAction.action === 'buy') {
      return (
        <button onClick={this.props.updateTurnAction(turnAction)}>
          Purchase {turnAction.transaction.property_name} for ${turnAction.transaction.amount}
        </button>
      );
    }
    if (turnAction.action === 'pay') {
      const receiver = this.props.players.find(player => player.id === turnAction.transaction.receiver_id);
      return (
        <button onClick={this.props.updateTurnAction(turnAction)}>
          Pay ${turnAction.transaction.amount} {receiver ? `to ${receiver.username}` : ''}
        </button>
      );
    }
    if (turnAction.action === 'draw') {
      return (
        <button onClick={this.onClickDraw}>
          Draw
        </button>
      );
    }
    return (
      <button onClick={this.props.updateTurnAction(turnAction)}>{turnAction.action}</button>
    );
  }
}

ActionButton.propTypes = {
  turnAction: PropTypes.object.isRequired,
  updateTurnAction: PropTypes.func.isRequired,
  players: PropTypes.array.isRequired,
  fetchTurnActions: PropTypes.func.isRequired,
};

const mapStateToProps = ({ turns, activeGame }) => {
  const currentTurn = turns.items[0];
  return {
    players: activeGame.players,
    turnAction: currentTurn.actions[0],
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateTurnAction: ({ id, turn_id }) => async () => {
      dispatch(updateTurnActionRequest());
      const updateTurnAction = () => put(`/api/turns/${turn_id}/turn_actions/${id}`);
      return apiRequest(updateTurnAction, (json) => {
        dispatch(updateTurnActionReceived(json.turn_action));
      });
    },
    fetchTurnActions: (turnId) => {
      dispatch(fetchTurnActionsRequest());
      const fetchTurnActions = () => get(`/api/turns/${turnId}/turn_actions`);
      return apiRequest(fetchTurnActions, (json) => {
        dispatch(fetchTurnActionsReceived(json.turn_actions));
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionButton);
