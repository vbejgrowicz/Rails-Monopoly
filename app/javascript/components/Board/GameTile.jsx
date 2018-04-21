import React from 'react';
import PropTypes from 'prop-types';

const cornerTitle = {
  'go-to-jail': item => (
    <div className={`title ${item.category}`}>
      <span>go to</span><span>jail</span>
    </div>
  ),
  'free-parking': item => (
    <div className={`title ${item.category}`}>
      <span>free</span><span>parking</span>
    </div>
  ),
  'go': item => (<div className={`title ${item.category}`}>{item.description}</div>),
  'in-jail': item => (
    <div className={`title ${item.category}`}>
      <span>just</span><span>visiting</span>
    </div>
  ),
};

class GameTile extends React.Component {
  constructor() {
    super();

    this.renderTitle = this.renderTitle.bind(this);
  }

  renderTitle() {
    const { item } = this.props;
    if (cornerTitle[item.category]) {
      return cornerTitle[item.category](item);
    }
    return (
      <div className={`title ${item.category}`}>{item.title}</div>
    );
  }
  render() {
    const { item } = this.props;
    return (
      <div className={item.position % 10 === 0 ? 'corner' : 'tile'}>
        <div className="tile-data">
          <div className={item.color && `color ${item.color}`} />
          {this.renderTitle()}
          <div className={`image ${item.category}`} />
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
