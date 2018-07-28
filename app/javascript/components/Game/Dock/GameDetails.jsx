import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class GameDetails extends React.Component {
  render() {
    const { properties, players } = this.props;
    return (
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
    );
  }
}

GameDetails.propTypes = {
  properties: PropTypes.array.isRequired,
  players: PropTypes.array.isRequired,
};

const mapStateToProps = ({ properties, activeGame }) => ({
  properties: properties.items,
  players: activeGame.players,
});

export default connect(mapStateToProps, null)(GameDetails);
