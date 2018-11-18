import React from 'react';
import PropTypes from 'prop-types';
import TokenSelection from './TokenSelection';

class GameItem extends React.Component {
  constructor() {
    super();
    this.state = { showModal: false };

    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  }

  render() {
    const { id, host_id, created_at, players } = this.props.game;
    const onClickFunction = this.props.gameItemDisplay === 'Join Game' ? this.toggleModal : () => this.props.onGameClick(id);
    return (
      <div className="game-row">
        <div className="game-item id">{id}</div>
        <div className="game-item host">{host_id}</div>
        <div className="game-item created">{created_at}</div>
        <div className="game-item players">{players}</div>
        <div className="game-item join">
          <span onClick={onClickFunction}>{this.props.gameItemDisplay}</span>
        </div>
        {this.state.showModal && <TokenSelection onClickClose={this.toggleModal} onSubmit={(params) => this.props.onGameClick(id, params)} gameId={id} />}
      </div>
    );
  }
}

GameItem.propTypes = {
  game: PropTypes.object.isRequired,
  onGameClick: PropTypes.func.isRequired,
  gameItemDisplay: PropTypes.string.isRequired,
};

export default GameItem;
