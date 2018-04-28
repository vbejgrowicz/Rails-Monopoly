import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Player from './Player';

class GameSetup extends React.Component {
  constructor() {
    super();

    this.renderTitle = this.renderTitle.bind(this);
    this.renderSubtitle = this.renderSubtitle.bind(this);
    this.renderStartComponent = this.renderStartComponent.bind(this);
  }

  renderTitle() {
    const { started_at, id } = this.props.game;
    return started_at ? (
      <h2>Game {id} has started.</h2>
    ) : (
      <h2>Game {id} has not started yet.</h2>
    );
  }

  renderStartComponent() {
    const { currentUserId } = this.props;
    const { host_id } = this.props.game;
    return currentUserId === host_id ? (
      <button className="start-button">Start Game</button>
    ) : (
      <h3 className="wait-text">Waiting on host to start game...</h3>
    );
  }

  renderSubtitle() {
    const { started_at } = this.props.game;
    return started_at ? (
      <h3 className="wait-text">Waiting on players to roll...</h3>
    ) : this.renderStartComponent();
  }

  render() {
    const { currentUserId } = this.props;
    const { players, started_at } = this.props.game;
    return (
      <div className="setup">
        {this.renderTitle()}
        {this.renderSubtitle()}
        <div className="player-group">
          {players.map(player => (
            <Player
              key={player.user_id}
              player={player}
              currentUserId={currentUserId}
              gameStarted={!!started_at}
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
};

const mapStateToProps = ({ games, currentUser }) => ({
  game: games.activeGame,
  currentUserId: currentUser.id,
});

export default connect(mapStateToProps, null)(GameSetup);
