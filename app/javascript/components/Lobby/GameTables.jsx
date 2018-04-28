import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get, post, apiRequest } from '../../utils/fetch';
import { fetchGamesRequest, fetchGamesReceived, joinGameRequest, joinGameReceived } from '../../actions';
import GameTable from './GameTable';

class GameTables extends React.Component {
  constructor() {
    super();

    this.enterGame = this.enterGame.bind(this);
  }
  componentWillMount() {
    this.props.fetchGames();
  }

  enterGame(id) {
    this.props.history.push(`/game/${id}`);
  }

  render() {
    const activeGames = this.props.games.filter(game => this.props.user.active_game_ids.indexOf(game.id) > -1);
    const pendingGames = this.props.games.filter(game => this.props.user.active_game_ids.indexOf(game.id) === -1);
    return [
      <GameTable games={activeGames} title="Active Games" canCreate key="active" gameItemDisplay="Enter Game" onGameClick={this.enterGame} />,
      <GameTable games={pendingGames} title="Pending Games" canCreate={false} key="pending" gameItemDisplay="Join Game" onGameClick={this.props.joinGame} />,
    ];
  }
}

GameTables.propTypes = {
  games: PropTypes.array,
  user: PropTypes.object.isRequired,
  fetchGames: PropTypes.func.isRequired,
  joinGame: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

GameTables.defaultProps = {
  games: [],
};

const mapStateToProps = ({ games, currentUser }) => ({
  games: games.items,
  user: currentUser,
});

const mapDispatchToProps = dispatch => ({
  fetchGames: async () => {
    dispatch(fetchGamesRequest());
    const getGames = () => get('/api/games');
    apiRequest(getGames, (json) => {
      dispatch(fetchGamesReceived(json.games));
    });
  },
  joinGame: async (gameId, params) => {
    dispatch(joinGameRequest());
    const joinGame = () => post(`/api/games/${gameId}/players`, params);
    apiRequest(joinGame, (json) => {
      dispatch(joinGameReceived(json.player));
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(GameTables);
