import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get, apiRequest } from '../../utils/fetch';
import { fetchGameRequest, fetchGameReceived } from '../../actions';
import GameBoard from './Board/GameBoard';
import GameSetup from './Setup/GameSetup';

class Game extends React.Component {
  componentWillMount() {
    this.props.fetchGame();
  }

  render() {
    const { inSetup, isFetching } = this.props;
    return isFetching ? <div>Loading...</div> : (
      <div className={`game ${inSetup && 'pending'}`}>
        {inSetup && <GameSetup />}
        <GameBoard />
      </div>
    );
  }
}

Game.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  inSetup: PropTypes.bool.isRequired,
  fetchGame: PropTypes.func.isRequired,
};

const mapStateToProps = ({ games }, ownProps) => ({
  isFetching: games.isFetching || parseInt(ownProps.match.params.id, 10) !== (games.activeGame.id || 0),
  inSetup: !!games.activeGame.started_at || !(games.activeGame.players || []).every(player => !!player.roll),
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
