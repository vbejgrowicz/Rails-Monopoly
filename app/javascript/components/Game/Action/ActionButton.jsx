import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { put, apiRequest } from '../../../utils/fetch';
import { updateTurnActionRequest, updateTurnActionReceived, updatePropertiesOwner, updatePlayersMoney } from '../../../actions';
import { getSubscription } from '../../../utils/cable';

class ActionButton extends React.Component {
  onClickDraw = () => {
    const { turnAction, cable } = this.props;
    this.props.updateTurnAction(turnAction, cable).then(() => {
      // this.props.fetchNextTurnAction()
    });
  }

  render() {
    const { turnAction, cable } = this.props;
    if (turnAction.action === 'buy') {
      return (
        <button onClick={this.props.updateTurnAction(turnAction, cable)}>
          Purchase {turnAction.transaction.property_name} for ${turnAction.transaction.amount}
        </button>
      );
    }
    if (turnAction.action === 'pay') {
      const receiver = this.props.players.find(player => player.id === turnAction.transaction.receiver_id);
      return (
        <button onClick={this.props.updateTurnAction(turnAction, cable)}>
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
  cable: PropTypes.object.isRequired,
  players: PropTypes.array.isRequired,
};

const mapStateToProps = ({ turns, cable, activeGame }) => {
  const currentTurn = turns.items[0];
  return {
    players: activeGame.players,
    turnAction: currentTurn.actions[0],
    cable,
  };
};

const mapDispatchToProps = (dispatch) => {
  const updatePlayers = (data, cable) => {
    const playerMoneySub = getSubscription(cable, 'playerMoney');
    const propertySub = getSubscription(cable, 'property');

    dispatch(updatePlayersMoney(data.players));
    dispatch(updatePropertiesOwner(data.players));
    playerMoneySub.send(data);
    propertySub.send(data);
  };

  return {
    updateTurnAction: ({ id, turn_id }, cable) => async () => {
      dispatch(updateTurnActionRequest());
      const updateTurnAction = () => put(`/api/turns/${turn_id}/turn_actions/${id}`);
      return apiRequest(updateTurnAction, (json) => {
        dispatch(updateTurnActionReceived(json.turn_action));
        if (json.data && json.data.players) {
          updatePlayers(json.data, cable);
        }
      });
    },
    // fetchNextTurnAction: () => {},
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionButton);
