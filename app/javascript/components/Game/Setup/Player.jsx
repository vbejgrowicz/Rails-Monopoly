import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createRollRequest, createRollReceived } from '../../../actions';
import { post, apiRequest } from '../../../utils/fetch';

const dieMapper = {
  1: 'one',
  2: 'two',
  3: 'three',
  4: 'four',
  5: 'five',
  6: 'six',
};

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
      <button className="action button" onClick={() => this.props.roll(id)}>Roll</button>
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
    const { player, gameStarted } = this.props;
    return (
      <div className="player-data" key={player.user_id}>
        <div className={`token ${player.token}`}>
          <span className="token-tooltip">User {player.user_id}</span>
        </div>
        {gameStarted && (
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
  gameStarted: PropTypes.bool.isRequired,
  roll: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  roll: async (playerId) => {
    dispatch(createRollRequest());
    const createRoll = () => post(`/api/players/${playerId}/rolls`);
    apiRequest(createRoll, (json) => {
      dispatch(createRollReceived(json.roll));
    });
  },
});

export default connect(null, mapDispatchToProps)(Player);
