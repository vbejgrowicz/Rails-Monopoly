import React from 'react';
import PropTypes from 'prop-types';
import GameTile from './GameTile';

class GameRow extends React.Component {
  render() {
    return (
      <div className={`row ${this.props.position}`}>
        {this.props.items.map(item => (
          <GameTile item={item} key={item.id} />
        ))}
      </div>
    );
  }
}

GameRow.propTypes = {
  items: PropTypes.array.isRequired,
  position: PropTypes.string.isRequired,
};

export default GameRow;
