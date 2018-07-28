import React from 'react';
import PropTypes from 'prop-types';
import GameDetails from './GameDetails';

class GameActions extends React.Component {
  render() {
    return (
      <div className="game-actions">
        <button className="action-btn">Game Details</button>
        <GameDetails />
      </div>
    );
  }
}

GameActions.propTypes = {
};

export default GameActions;
