import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PlayerCard from './PlayerCard';

class GameDock extends React.Component {
  render() {
    return (
      <div className="dock">
        <div className="players">
          {this.props.players.map(player => <PlayerCard key={player.id} player={player} />)}
        </div>
        <div className="player-actions">
          <div className="dice-group">
            <div className="die one" />
            <div className="die one" />
          </div>
          <button className="roll">Roll</button>
          <div>It's Your Turn!</div>
          <div className="turn-disabled" />
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
