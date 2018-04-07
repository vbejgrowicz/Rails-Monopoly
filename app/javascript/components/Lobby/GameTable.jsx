import React from 'react';
import { connect } from 'react-redux';

class GameTable extends React.Component {
  render() {
    this.props.fetchGames();
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

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGames: async () => {
      console.log('fetching');
      const x = await fetch('http://localhost:5000/api/games', { 'Content-Type': 'application/json' });
      const y = await x.json();
      console.log(y);
    },
  };
};

export default connect(null, mapDispatchToProps)(GameTable);
