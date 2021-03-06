import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createRollRequest, createRollReceived } from '../../../actions';
import { post, apiRequest } from '../../../utils/fetch';
import { dieMapper } from '../../../utils/helpers';

class Player extends React.Component {
  constructor() {
    super();

    this.actionRender = this.actionRender.bind(this);
    this.diceRender = this.diceRender.bind(this);
  }

  actionRender() {
    const { currentUserId } = this.props;
    const { id, user_id } = this.props.player;
    return currentUserId === user_id ? (
      <button className="action button" onClick={this.props.roll(id)}>Roll</button>
    ) : (
      <div className="action pending">Awaiting Roll...</div>
    );
  }

  diceRender() {
    const { die_one, die_two } = this.props.player.roll;
    return (
      <div className="dice-group">
        <div className={`die ${dieMapper[die_one]}`} />
        <div className={`die ${dieMapper[die_two]}`} />
      </div>
    );
  }

  render() {
    const { player, gameLocked } = this.props;
    return (
      <div className="player-data" key={player.user_id}>
        <div className={`token ${player.token}`}>
          <span className={`token-tooltip player-color ${player.token}`}>{player.username}</span>
        </div>
        {gameLocked && (
          <div className="roll-group">
            {player.roll.id ? this.diceRender() : this.actionRender()}
          </div>
        )}
      </div>
    );
  }
}

Player.propTypes = {
  currentUserId: PropTypes.number.isRequired,
  player: PropTypes.object.isRequired,
  gameLocked: PropTypes.bool.isRequired,
  roll: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  roll: playerId => async () => {
    dispatch(createRollRequest());
    const createRoll = () => post(`/api/players/${playerId}/rolls`, { first_roll: true });
    apiRequest(createRoll, (json) => {
      dispatch(createRollReceived(json.roll));
    });
  },
});

export default connect(null, mapDispatchToProps)(Player);
