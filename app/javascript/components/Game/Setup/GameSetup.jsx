import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Player from './Player';
import { updateGameRequest, updateGameReceived } from '../../../actions';
import { put, apiRequest } from '../../../utils/fetch';

const allPlayersHaveRolled = game => (
  (game.players || []).every(player => !!player.roll.id)
);

class GameSetup extends React.Component {
  constructor() {
    super();

    this.renderUnlocked = this.renderUnlocked.bind(this);
    this.renderLockedWithoutRolls = this.renderLockedWithoutRolls.bind(this);
    this.renderLockedWithRolls = this.renderLockedWithRolls.bind(this);
  }

  renderUnlocked() {
    const { locked_at, id, host_id, players } = this.props.game;
    const { currentUserId } = this.props;
    return !locked_at && (
      <div>
        <h2>Game {id} is waiting for players to join.</h2>
        {host_id === currentUserId ? (
          <button className="start-button" onClick={this.props.lockGame} disabled={players.length <= 1}>Lock Game</button>
        ) : (<h3 className="wait-text">Game will be locked momentarily.</h3>)}
      </div>
    );
  }

  renderLockedWithoutRolls() {
    const { game } = this.props;
    const { id } = this.props.game;
    return !allPlayersHaveRolled(game) && (
      <div>
        <h2>Game {id} has been locked.</h2>
        <h3 className="wait-text">Waiting on players to roll...</h3>
      </div>
    );
  }

  renderLockedWithRolls() {
    const { id, host_id } = this.props.game;
    const { currentUserId, game } = this.props;
    return allPlayersHaveRolled(game) && (
      <div>
        {host_id === currentUserId ? (
          <div>
            <h2>Game {id} is waiting for you to begin.</h2>
            <button className="start-button" onClick={this.props.startGame}>Start Game</button>
          </div>
        ) : (
          <div>
            <h2>Game {id} is waiting for host to begin.</h2>
            <h3 className="wait-text">Game will begin momentarily.</h3>
          </div>
        )}
      </div>
    );
  }

  render() {
    const { currentUserId } = this.props;
    const { players, locked_at } = this.props.game;
    return (
      <div className="setup">
        {this.renderUnlocked()}
        {locked_at && this.renderLockedWithoutRolls()}
        {locked_at && this.renderLockedWithRolls()}
        <div className="player-group">
          {players.map(player => (
            <Player
              key={player.user_id}
              player={player}
              currentUserId={currentUserId}
              gameLocked={!!locked_at}
            />
          ))}
        </div>
      </div>
    );
  }
}

GameSetup.propTypes = {
  currentUserId: PropTypes.number.isRequired,
  game: PropTypes.object.isRequired,
  lockGame: PropTypes.func.isRequired,
  startGame: PropTypes.func.isRequired,
};

const mapStateToProps = ({ activeGame, currentUser }) => ({
  game: activeGame,
  currentUserId: currentUser.id,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  lockGame: async () => {
    const gameId = ownProps.match.params.id;
    dispatch(updateGameRequest(gameId));
    const updateGame = () => put(`/api/games/${gameId}`, { locked_at: new Date() });
    apiRequest(updateGame, (json) => {
      dispatch(updateGameReceived(json.game));
    });
  },
  startGame: async () => {
    const gameId = ownProps.match.params.id;
    dispatch(updateGameRequest(gameId));
    const updateGame = () => put(`/api/games/${gameId}`, { started_at: new Date() });
    apiRequest(updateGame, (json) => {
      dispatch(updateGameReceived(json.game));
    });
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GameSetup));
