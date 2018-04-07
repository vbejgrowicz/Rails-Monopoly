import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get, apiRequest } from '../../utils/fetch';
import { fetchGamesRequest, fetchGamesReceived } from '../../actions';
import GameItem from './GameItem';
import HeaderItem from './HeaderItem';
import CreateGameButton from './CreateGameButton';

class GameTable extends React.Component {
  componentWillMount() {
    this.props.fetchGames();
  }

  render() {
    return (
      <div className="game-table">
        <div className="game-row">
          <div className="header-title">Active Games</div>
          <CreateGameButton />
        </div>
        <HeaderItem />
        {this.props.games.map(game => (
          <GameItem key={game.id} game={game} />
        ))}
      </div>
    );
  }
}

GameTable.propTypes = {
  games: PropTypes.array.isRequired,
  fetchGames: PropTypes.func.isRequired,
};

const mapStateToProps = ({ games }) => ({
  games: games.items,
});

const mapDispatchToProps = dispatch => ({
  fetchGames: async () => {
    dispatch(fetchGamesRequest());
    const getGames = () => get('/api/games');
    apiRequest(getGames, (json) => {
      dispatch(fetchGamesReceived(json.games));
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(GameTable);
