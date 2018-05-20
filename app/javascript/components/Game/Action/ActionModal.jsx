import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GameTile from '../Board/GameTile';
import { put, apiRequest } from '../../../utils/fetch';
import { updateTurnActionRequest, updateTurnActionReceived } from '../../../actions';

class ActionModal extends React.Component {
  render() {
    const { actionSpace, action, shouldShow, turnId, turnActionId } = this.props;
    return shouldShow && (
      <div className="outer-modal action">
        <div className="modal">
          <div className="contents">
            <GameTile item={actionSpace} shouldShowTokens={false} />
            <button onClick={this.props.updateTurnAction(turnId, turnActionId)}>{action}</button>
          </div>
        </div>
      </div>
    );
  }
}

ActionModal.propTypes = {
  shouldShow: PropTypes.bool.isRequired,
  actionSpace: PropTypes.object.isRequired,
  action: PropTypes.string.isRequired,
  turnId: PropTypes.number.isRequired,
  turnActionId: PropTypes.number.isRequired,
  updateTurnAction: PropTypes.func.isRequired,
};

const mapStateToProps = ({ turns, activeGame, spaces, currentUser }) => {
  const currentTurn = turns.items[0];
  const currentPlayer = activeGame.players.find(player => player.user_id === currentUser.id);
  const isNotYourTurn = currentTurn.player.id !== currentPlayer.id;
  const noAction = !currentTurn.actions[0];
  const actionIsCompleted = (currentTurn.actions[0] || {}).completed;

  if (isNotYourTurn || noAction || actionIsCompleted) {
    return {
      shouldShow: false,
      actionSpace: {},
      action: '',
      turnId: 0,
      turnActionId: 0,
    };
  }

  return {
    shouldShow: true,
    actionSpace: spaces.items.find(space => space.id === currentTurn.end_space_id),
    action: currentTurn.actions[0].action,
    turnId: currentTurn.id,
    turnActionId: currentTurn.actions[0].id,
  };
};

const mapDispatchToProps = dispatch => ({
  updateTurnAction: (turnId, turnActionId) => async () => {
    dispatch(updateTurnActionRequest());
    const updateTurnAction = () => put(`/api/turns/${turnId}/turn_actions/${turnActionId}`);
    return apiRequest(updateTurnAction, (json) => {
      dispatch(updateTurnActionReceived(json.turn_action));
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ActionModal);
