import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const getTokenClass = (position, players) => {
  const emptySlot = { token: '' };
  const player = players[position] || emptySlot;
  return player.token;
};

class TokenSpaces extends React.Component {
  renderJail(playersOnSpace) {
    const inJail = playersOnSpace.filter(player => player.in_jail);
    const notInJail = playersOnSpace.filter(player => !player.in_jail);
    return (
      <div className="token-area">
        <div className="in-jail">
          <div className="token-group one">
            <div className={`token ${getTokenClass(0, inJail)}`} />
            <div className={`token ${getTokenClass(1, inJail)}`} />
          </div>
          <div className="token-group two">
            <div className={`token ${getTokenClass(2, inJail)}`} />
            <div className={`token ${getTokenClass(3, inJail)}`} />
          </div>
          <div className="token-group three">
            <div className={`token ${getTokenClass(4, inJail)}`} />
            <div className={`token ${getTokenClass(5, inJail)}`} />
          </div>
        </div>
        <div className="just-visiting">
          <div className="left">
            <div className="token-group one">
              <div className={`token ${getTokenClass(0, notInJail)}`} />
              <div className={`token ${getTokenClass(1, notInJail)}`} />
              <div className={`token ${getTokenClass(2, notInJail)}`} />
              <div className={`token ${getTokenClass(3, notInJail)}`} />
            </div>
          </div>
          <div className="bottom">
            <div className="token-group two">
              <div className={`token ${getTokenClass(4, notInJail)}`} />
              <div className={`token ${getTokenClass(5, notInJail)}`} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderDefault(playersOnSpace) {
    return (
      <div className="token-area">
        <div className="token-group one">
          <div className={`token ${getTokenClass(0, playersOnSpace)}`} />
          <div className={`token ${getTokenClass(1, playersOnSpace)}`} />
        </div>
        <div className="token-group two">
          <div className={`token ${getTokenClass(2, playersOnSpace)}`} />
          <div className={`token ${getTokenClass(3, playersOnSpace)}`} />
        </div>
        <div className="token-group three">
          <div className={`token ${getTokenClass(4, playersOnSpace)}`} />
          <div className={`token ${getTokenClass(5, playersOnSpace)}`} />
        </div>
      </div>
    );
  }

  render() {
    const { item, players } = this.props;
    const playersOnSpace = players.filter(player => player.position === item.position)
    return item.category === 'in-jail' ? this.renderJail(playersOnSpace) : this.renderDefault(playersOnSpace);
  }
}

TokenSpaces.propTypes = {
  item: PropTypes.object.isRequired,
};

const mapStateToProps = ({ activeGame }) => ({
  players: activeGame.players,
});

export default connect(mapStateToProps, null)(TokenSpaces);
