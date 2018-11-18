import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { put, apiRequest } from '../../../utils/fetch';
import { updateTurnActionRequest, updateTurnActionReceived, updatePropertyOwner, updatePlayerMoney } from '../../../actions';
import { getSubscription } from '../../../utils/cable';

class ActionButton extends React.Component {
  render() {
    const { turnAction, cable } = this.props;
    if (turnAction.action === 'buy') {
      return (
        <button onClick={this.props.updateTurnAction(turnAction, cable)}>
          Purchase {turnAction.transaction.property_name} for ${turnAction.transaction.amount}
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
};

const mapStateToProps = ({ turns, cable }) => {
  const currentTurn = turns.items[0];
  return {
    turnAction: currentTurn.actions[0],
    cable,
  };
};

const mapDispatchToProps = (dispatch) => {
  const updatePurchaseProperty = (buy_data, cable) => {
    const { player_id, money, property_id } = buy_data;
    dispatch(updatePropertyOwner(player_id, property_id));
    dispatch(updatePlayerMoney(player_id, money));
    const playerMoneySub = getSubscription(cable, 'playerMoney');
    const propertySub = getSubscription(cable, 'property');
    playerMoneySub.send(buy_data);
    propertySub.send(buy_data);
  };

  return {
    updateTurnAction: ({ id, turn_id }, cable) => async () => {
      dispatch(updateTurnActionRequest());
      const updateTurnAction = () => put(`/api/turns/${turn_id}/turn_actions/${id}`);
      return apiRequest(updateTurnAction, (json) => {
        dispatch(updateTurnActionReceived(json.turn_action));
        if (json.buy_data) {
          updatePurchaseProperty(json.buy_data, cable);
        }
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ActionButton);
