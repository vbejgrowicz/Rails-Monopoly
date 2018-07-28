import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class GameActions extends React.Component {
  render() {
    const { properties, players } = this.props;
    return (
      <div className="game-actions">
        <button className="action-btn">Game Details</button>
        <div className="game-details">
          <div className="outer-modal">
            <div className="modal">
              <div className="game-details-left">
                {properties.map((prop) => {
                  return (
                    <div key={prop.id}>{prop.name}</div>
                  );
                })}
              </div>
              <div className="game-details-right">
                {players.map((player) => {
                  return (
                    <div key={player.id}>{player.username}</div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

GameActions.propTypes = {
};

const mapStateToProps = ({ properties, activeGame }) => ({
  properties: properties.items,
  players: activeGame.players,
});

export default connect(mapStateToProps, null)(GameActions);
