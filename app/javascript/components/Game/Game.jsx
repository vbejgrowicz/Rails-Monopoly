import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get, apiRequest } from '../../utils/fetch';
import { fetchGameRequest, fetchGameReceived } from '../../actions';
import GameBoard from './Board/GameBoard';
import GameSetup from './GameSetup';

class Game extends React.Component {
  componentWillMount() {
    this.props.fetchGame();
  }

  render() {
    const { hasStarted, isFetching } = this.props;
    return isFetching ? <div>Loading...</div> : (
      <div className={`game ${!hasStarted && 'pending'}`}>
        {!hasStarted && <GameSetup />}
        <GameBoard />
      </div>
    );
  }
}

Game.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  hasStarted: PropTypes.bool.isRequired,
  fetchGame: PropTypes.func.isRequired,
};

const mapStateToProps = ({ games }, ownProps) => ({
  isFetching: games.isFetching || parseInt(ownProps.match.params.id, 10) !== (games.activeGame.id || 0),
  hasStarted: !!games.activeGame.started_at,
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
