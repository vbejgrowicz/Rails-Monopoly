import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PropertyTile from './PropertyTile';

class GameDetails extends React.Component {
  constructor(props) {
    super(props);
    const activePlayers = props.players.reduce((acc, el) => {
      acc[el.id] = false;
      return acc;
    }, {});

    this.state = { activePlayers };
  }

  setActive(playerId) {
    this.setState({
      activePlayers: {
        ...this.state.activePlayers,
        [playerId]: !this.state.activePlayers[playerId],
      },
    });
  }

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
                    {colorMapper[color].map((prop) => {
                      const owner = players.find(player => player.id === prop.owner_id);
                      return <PropertyTile key={prop.id} name={prop.name} color={prop.color} owner={owner} />
                    })}
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
                <div
                  className={`player-detail player-color ${player.token} ${this.state.activePlayers[player.id] && 'selected'}`}
                  key={player.id}
                  onClick={() => this.setActive(player.id)}
                >
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
