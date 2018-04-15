import React from 'react';
import PropTypes from 'prop-types';

class GameTile extends React.Component {
  render() {
    const { item } = this.props;
    return (
      <div className={item.position % 10 === 0 ? 'corner' : 'tile'}>
        <div className="tile-data">
          <div className={item.color && `color ${item.color}`} />
          <div className="title">{item.title}</div>
          <div className={`image ${item.color === 'black' ? 'railroad' : ''}`} />
          {item.color && (<div className="price">Price $100</div>)}
        </div>
      </div>
    );
  }
}

GameTile.propTypes = {
  item: PropTypes.object.isRequired,
};

export default GameTile;
