import React from 'react';
import GameDetails from './GameDetails';

class GameActions extends React.Component {
  constructor() {
    super();

    this.state = {
      gameDetailsModal: false,
    };
    this.toggleGameDetails = this.toggleGameDetails.bind(this);
  }

  toggleGameDetails() {
    this.setState({ gameDetailsModal: !this.state.gameDetailsModal });
  }

  render() {
    return (
      <div className="game-actions">
        <button className="action-btn" onClick={this.toggleGameDetails}>Game Details</button>
        {this.state.gameDetailsModal && <GameDetails onClose={this.toggleGameDetails} />}
      </div>
    );
  }
}

export default GameActions;
