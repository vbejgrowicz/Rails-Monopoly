import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PlayerCard from './PlayerCard';
import PlayerActions from './PlayerActions';

class GameDock extends React.Component {
  render() {
    return (
      <div className="dock">
        <div className="players">
          {this.props.players.map(player => <PlayerCard key={player.id} player={player} />)}
        </div>
          <div className="game-actions">
            <button className="action-btn">Game Details</button>
          </div>
        <div className="actions-group">
          <PlayerActions />
        </div>
      </div>
    );
  }
}

GameDock.propTypes = {
  players: PropTypes.array.isRequired,
};

const mapStateToProps = ({ activeGame }) => ({
  players: activeGame.players,
});

export default connect(mapStateToProps, null)(GameDock);
