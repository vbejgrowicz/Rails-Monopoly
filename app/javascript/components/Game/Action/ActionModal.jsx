import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ActionButton from './ActionButton';
import ActionDisplay from './ActionDisplay';

class ActionModal extends React.Component {
  render() {
    const { actionSpace, shouldShow, properties, card } = this.props;
    return shouldShow && (
      <div className="outer-modal action">
        <div className="modal">
          <div className="contents">
            <ActionDisplay actionSpace={actionSpace} properties={properties} card={card} />
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
  properties: PropTypes.array.isRequired,
  card: PropTypes.object.isRequired,
};

const mapStateToProps = ({ turns, activeGame, spaces, properties, currentUser }) => {
  const currentTurn = turns.items[0];
  const currentPlayer = activeGame.players.find(player => player.user_id === currentUser.id);
  const isNotYourTurn = currentTurn.player.id !== currentPlayer.id;
  const noAction = !currentTurn.actions[0];
  const actionIsCompleted = (currentTurn.actions[0] || {}).completed;

  if (isNotYourTurn || noAction || actionIsCompleted) {
    return {
      shouldShow: false,
      actionSpace: {},
      properties: [],
      card: {},
    };
  }

  return {
    shouldShow: true,
    actionSpace: spaces.items.find(space => space.id === currentTurn.end_space_id),
    properties: properties.items,
    card: currentTurn.actions[0].card,
  };
};

export default connect(mapStateToProps, null)(ActionModal);
