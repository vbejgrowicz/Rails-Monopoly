import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { post, apiRequest } from '../../utils/fetch';
import { joinGameRequest, joinGameReceived } from '../../actions';

class GameItem extends React.Component {
  render() {
    const { id, host_id, created_at, players } = this.props.game;
    return (
      <div className="game-row">
        <div className="game-item id">{id}</div>
        <div className="game-item host">{host_id}</div>
        <div className="game-item created">{created_at}</div>
        <div className="game-item players">{players}</div>
        <div className="game-item join">
          <span onClick={() => this.props.joinGame(id)}>Join This Game</span>
        </div>
      </div>
    );
  }
}

GameItem.propTypes = {
  game: PropTypes.object.isRequired,
  joinGame: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  joinGame: async (gameId) => {
    dispatch(joinGameRequest());
    const joinGame = () => post(`/api/games/${gameId}/players`);
    apiRequest(joinGame, (json) => {
      dispatch(joinGameReceived(json.player));
    });
  },
});

export default connect(null, mapDispatchToProps)(GameItem);
