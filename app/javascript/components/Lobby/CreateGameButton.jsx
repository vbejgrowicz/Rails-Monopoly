import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { post, apiRequest } from '../../utils/fetch';
import { createGameRequest, createGameReceived } from '../../actions';

class CreateGameButton extends React.Component {
  render() {
    return (
      <div className="header-create">
        <button onClick={() => this.props.createGame()}>Create New Game</button>
      </div>
    );
  }
}

CreateGameButton.propTypes = {
  createGame: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  createGame: async () => {
    dispatch(createGameRequest());
    const createGame = () => post('/api/games');
    apiRequest(createGame, (json) => {
      dispatch(createGameReceived(json.game));
    });
  },
});

export default connect(null, mapDispatchToProps)(CreateGameButton);
