import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class GameDock extends React.Component {
  render() {
    return (
      <div className="dock">
        <div className="players">
          <div className="player-card">
            <div className="token hat" />
            <div className="player-name">Name</div>
            <div className="player-money">$1500</div>
          </div>
          <div className="player-card">
            <div className="token hat" />
            <div className="player-name">Name</div>
            <div className="player-money">$1500</div>
          </div>
          <div className="player-card">
            <div className="token hat" />
            <div className="player-name">Name</div>
            <div className="player-money">$1500</div>
          </div>
          <div className="player-card">
            <div className="token hat" />
            <div className="player-name">Name</div>
            <div className="player-money">$1500</div>
          </div>
          <div className="player-card">
            <div className="token hat" />
            <div className="player-name">Name</div>
            <div className="player-money">$1500</div>
          </div>
          <div className="player-card">
            <div className="token hat" />
            <div className="player-name">Name</div>
            <div className="player-money">$1500</div>
          </div>
        </div>
        <div className="player-actions">
          <div className="dice-group">
            <div className="die one" />
            <div className="die one" />
          </div>
          <button className="roll">Roll</button>
          <div>It's Your Turn!</div>
          <div className="turn-disabled" />
        </div>
      </div>
    );
  }
}

export default connect(null, null)(GameDock);
