import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GameTile from '../Board/GameTile';
import ActionButton from './ActionButton';
import PropertyCard from '../Property/PropertyCard';

class ActionModal extends React.Component {
  render() {
    const { actionSpace, shouldShow } = this.props;
    return shouldShow && (
      <div className="outer-modal action">
        <div className="modal">
          <div className="contents">
            {actionSpace.is_property ? (
              <PropertyCard />
            ) : (
              <GameTile item={actionSpace} shouldShowTokens={false} />
            )}
            <ActionButton />
          </div>
        </div>
      </div>
    );
  }
}

ActionModal.propTypes = {
  shouldShow: PropTypes.bool.isRequired,
  actionSpace: PropTypes.object.isRequired,
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
    };
  }

  return {
    shouldShow: true,
    actionSpace: spaces.items.find(space => space.id === currentTurn.end_space_id),
  };
};

export default connect(mapStateToProps, null)(ActionModal);
