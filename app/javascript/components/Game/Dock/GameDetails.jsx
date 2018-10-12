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
        <div className="outer-modal" onClick={this.props.onClose}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <div className="game-details-left">
              <div className="property-details">
                {Object.keys(colorMapper).map(color => (
                  <div className="details-color-set" key={color}>
                    {colorMapper[color].map(prop => (
                      <div className={`property-color ${prop.color} ${prop.owner_id ? 'owned' : 'unowned'} ${'player-border-color ' + (players.find(player => player.id === prop.owner_id) || {}).token}`} key={prop.id}>{prop.name}</div>
                    ))}
                  </div>
                ))}
              </div>
              <div className="detail-all">
                <div className="detail-buttons">
                  <button>Trade</button>
                  <button>Mortgage</button>
                </div>
                <div className="detail-info">
                  <div>Houses Left</div>
                  <div>Hotels Left</div>
                  <div>Game Time: 28734293742</div>
                </div>
              </div>
            </div>
            <div className="game-details-right">
              {players.map(player => (
                <div className={`player-detail player-color ${player.token}`} key={player.id}>
                  <div className={`token ${player.token}`} />
                  <div className="detail-data">
                    <div>{player.username}</div>
                    <div>${player.money}</div>
                  </div>
                </div>
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
  onClose: PropTypes.func.isRequired,
};

const mapStateToProps = ({ properties, activeGame }) => ({
  properties: properties.items,
  players: activeGame.players,
});

export default connect(mapStateToProps, null)(GameDetails);
