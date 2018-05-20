import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GameTile from '../Board/GameTile';

class ActionModal extends React.Component {
  render() {
    const { actionSpace, action, shouldShow } = this.props;
    return shouldShow && (
      <div className="outer-modal action">
        <div className="modal">
          <div className="contents">
            <GameTile item={actionSpace} shouldShowTokens={false} />
            <button>{action}</button>
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
    };
  }

  return {
    shouldShow: true,
    actionSpace: spaces.items.find(space => space.id === currentTurn.end_space_id),
    action: currentTurn.actions[0].action,
  };
};

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(ActionModal);
