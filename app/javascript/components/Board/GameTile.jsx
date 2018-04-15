import React from 'react';
import PropTypes from 'prop-types';

class GameTile extends React.Component {
  render() {
    const { item } = this.props;
    return (
      <div className={item.position % 10 === 0 ? 'corner' : 'tile'}>
        <div className="tile-data">
          <div className={item.color && `color ${item.color}`} />
          <div>{item.title}</div>
        </div>
      </div>
    );
  }
}

GameTile.propTypes = {
  item: PropTypes.object.isRequired,
};

export default GameTile;
