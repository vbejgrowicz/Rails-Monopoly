import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { put, apiRequest } from '../../../utils/fetch';
import { updateTurnActionRequest, updateTurnActionReceived } from '../../../actions';

class ActionButton extends React.Component {
  render() {
    const { turnAction } = this.props;
    if (turnAction.action === 'buy') {
      return (
        <button onClick={this.props.updateTurnAction(turnAction)}>
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
};

const mapStateToProps = ({ turns }) => {
  const currentTurn = turns.items[0];
  return {
    turnAction: currentTurn.actions[0],
  };
};

const mapDispatchToProps = dispatch => ({
  updateTurnAction: ({ id, turn_id }) => async () => {
    dispatch(updateTurnActionRequest());
    const updateTurnAction = () => put(`/api/turns/${turn_id}/turn_actions/${id}`);
    return apiRequest(updateTurnAction, (json) => {
      dispatch(updateTurnActionReceived(json.turn_action));
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ActionButton);
