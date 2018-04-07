import React from 'react';
import { connect } from 'react-redux';
import { get } from '../../utils/fetch';
import { fetchGamesRequest, fetchGamesReceived } from '../../actions';
import GameItem from './GameItem';
import HeaderItem from './HeaderItem';

class GameTable extends React.Component {
  componentWillMount() {
    this.props.fetchGames();
  }

  render() {
    return (
      <div className="game-table">
        <div className="game-row">
          <div className="header-title">Active Games</div>
          <div className="header-create">
            <button>Create New Game</button>
          </div>
        </div>
        <HeaderItem />
        {this.props.games.map(game => (
          <GameItem key={game.id} game={game} />
        ))}
      </div>
    );
  }
}

const mapStateToProps = ({ games }) => {
  return {
    games: games.items,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchGames: async () => {
      dispatch(fetchGamesRequest());
      const resp = await get('/api/games');
      const json = await resp.json();
      dispatch(fetchGamesReceived(json.games));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameTable);
