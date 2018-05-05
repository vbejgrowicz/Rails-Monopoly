import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { dieMapper } from '../../../utils/helpers';

class PlayerActions extends React.Component {
  render() {
    const { isActivePlayer, currentTurn } = this.props;
    const { roll } = currentTurn;
    return (
      <div className={`player-actions ${isActivePlayer ? 'active' : ''}`}>
        <div className="dice-group">
          <div className={`die ${roll.id ? dieMapper[roll.die_one] : 'one'}`} />
          <div className={`die ${roll.id ? dieMapper[roll.die_two] : 'one'}`} />
        </div>
        <button className="roll">Roll</button>
        <div>It's Your Turn!</div>
      </div>
    );
  }
}

PlayerActions.propTypes = {
  isActivePlayer: PropTypes.bool.isRequired,
  currentTurn: PropTypes.object.isRequired,
};

const mapStateToProps = ({ currentUser, turns }) => ({
  isActivePlayer: currentUser.id === turns.items[0].player.user_id,
  currentTurn: turns.items[0],
});

export default connect(mapStateToProps, null)(PlayerActions);
