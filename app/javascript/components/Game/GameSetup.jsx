import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class GameSetup extends React.Component {
  render() {
    const { currentUserId } = this.props;
    const { id, host_id, players } = this.props.game;
    return (
      <div className="setup">
        <h2>Game {id} has not started yet.</h2>
        {currentUserId === host_id ? (
          <button className="start-button">Start Game</button>
        ) : (
          <h3 className="wait-text">Waiting on host to start game...</h3>
        )}
        <div>
          {players.map(player => (
            <div className={`token ${player.token}`}>
              <span className="token-tooltip">User {player.user_id}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

GameSetup.propTypes = {
  currentUserId: PropTypes.number.isRequired,
  game: PropTypes.object.isRequired,
};

const mapStateToProps = ({ games, currentUser }) => ({
  game: games.activeGame,
  currentUserId: currentUser.id,
});

export default connect(mapStateToProps, null)(GameSetup);
