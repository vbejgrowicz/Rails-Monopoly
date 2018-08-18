import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class GameDetails extends React.Component {
  render() {
    const { properties, players } = this.props;
    const colorMapper = properties.reduce((acc, el) => {
      acc[el.color] = (acc[el.color] || []).concat(el);
      return acc;
    }, {});
    return (
      <div className="game-details">
        <div className="outer-modal">
          <div className="modal">
            <div className="game-details-left">
              {Object.keys(colorMapper).map(color => (
                <div className="details-color-set">
                  {colorMapper[color].map(prop => (
                    <div className={`property-color ${prop.color} ${prop.owner_id ? 'owned' : 'unowned'}`} key={prop.id}>{prop.name}</div>
                  ))}
                </div>
              ))}
            </div>
            <div className="game-details-right">
              {players.map(player => (
                <div key={player.id}>{player.username}</div>
              ))}
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
