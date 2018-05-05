import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get, apiRequest } from '../../utils/fetch';
import { fetchGameRequest, fetchGameReceived } from '../../actions';
import GameBoard from './Board/GameBoard';
import GameSetup from './Setup/GameSetup';
import GameDock from './Dock/GameDock';

class Game extends React.Component {
  componentWillMount() {
    this.props.fetchGame();
  }

  // componentWillReceiveProps(nextProps) {
    // if (!this.props.isFetching && this.props.inSetup !== nextProps.inSetup) {
      // this.props.fetchGame();
    // }
  // }

  render() {
    const { inSetup, isFetching } = this.props;
    return isFetching ? <div>Loading...</div> : (
      <div className={`game ${inSetup && 'pending'}`}>
        {inSetup && <GameSetup />}
        <GameBoard />
        {!inSetup && <GameDock />}
      </div>
    );
  }
}

Game.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  inSetup: PropTypes.bool.isRequired,
  fetchGame: PropTypes.func.isRequired,
};

function gameIsFetching(activeGame, ownProps) {
  const { isFetching } = activeGame;
  const routeGameId = parseInt(ownProps.match.params.id, 10);
  const fetchedGameMatchesRoute = routeGameId === (activeGame.id || 0);
  return isFetching || !fetchedGameMatchesRoute;
}

const mapStateToProps = ({ activeGame }, ownProps) => ({
  isFetching: gameIsFetching(activeGame, ownProps),
  inSetup: !activeGame.started_at,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchGame: async () => {
    const gameId = ownProps.match.params.id;
    dispatch(fetchGameRequest(gameId));
    const getGame = () => get(`/api/games/${gameId}`);
    const status = await apiRequest(getGame, (json) => {
      dispatch(fetchGameReceived(json.game));
    });
    if (status.error) {
      ownProps.history.push('/lobby');
    }
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
