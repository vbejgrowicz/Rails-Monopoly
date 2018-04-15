import React from 'react';
import PropTypes from 'prop-types';

class GameTile extends React.Component {
  render() {
    const { item } = this.props;
    return (
      <div className={item.position % 10 === 0 ? 'corner' : 'tile'}>
        <div>{item.title}</div>
      </div>
    );
  }
}

GameTile.propTypes = {
  item: PropTypes.object.isRequired,
};

export default GameTile;
