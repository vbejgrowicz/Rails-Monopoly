import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { post, apiRequest } from '../../utils/fetch';
import { createGameRequest, createGameReceived } from '../../actions';
import TokenSelection from './TokenSelection';

class CreateGameButton extends React.Component {
  constructor() {
    super();
    this.state = { showModal: false };

    this.toggleModal = this.toggleModal.bind(this);
    this.createGame = this.createGame.bind(this);
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  createGame() {
    this.props.createGame();
    this.toggleModal();
  }

  render() {
    return (
      <div className="header-create">
        <button onClick={this.toggleModal}>Create New Game</button>
        {this.state.showModal && <TokenSelection onClickClose={this.toggleModal} onSubmit={this.createGame} gameId="new" />}
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
