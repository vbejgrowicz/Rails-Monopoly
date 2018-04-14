import React from 'react';
import PropTypes from 'prop-types';
import GameItem from './GameItem';
import HeaderItem from './HeaderItem';
import CreateGameButton from './CreateGameButton';

class GameTable extends React.Component {
  render() {
    const { canCreate, games, title, gameItemDisplay, onGameClick } = this.props;
    return (
      <div className="game-table">
        <div className="game-row">
          <div className="header-title">{title}</div>
          {canCreate && <CreateGameButton />}
        </div>
        <HeaderItem />
        {games.map(game => (
          <GameItem key={game.id} game={game} gameItemDisplay={gameItemDisplay} onGameClick={onGameClick} />
        ))}
      </div>
    );
  }
}

GameTable.propTypes = {
  games: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
  canCreate: PropTypes.bool.isRequired,
  gameItemDisplay: PropTypes.string.isRequired,
  onGameClick: PropTypes.func.isRequired,
};

export default GameTable;
