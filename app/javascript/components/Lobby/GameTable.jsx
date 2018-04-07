import React from 'react';

class GameTable extends React.Component {
  render() {
    return (
      <div className="game-table">
        <div className="game-row">
          <div className="header-title">Active Games</div>
          <div className="header-create">
            <button>Create New Game</button>
          </div>
        </div>
        <div className="game-row">
          <div className="game-item id">id</div>
          <div className="game-item host">host</div>
          <div className="game-item created">created</div>
          <div className="game-item players">players</div>
          <div className="game-item join">join</div>
        </div>
        <div className="game-row">
          <div className="game-item id">id</div>
          <div className="game-item host">host</div>
          <div className="game-item created">created</div>
          <div className="game-item players">players</div>
          <div className="game-item join">join</div>
        </div>
      </div>
    );
  }
}

export default GameTable;
