import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TokenSpaces from './TokenSpaces';

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

const specialDescriptions = ['luxury-tax', 'income-tax', 'community-chest'];

class GameTile extends React.Component {
  constructor() {
    super();

    this.renderTitle = this.renderTitle.bind(this);
    this.renderDescription = this.renderDescription.bind(this);
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

  renderDescription() {
    const { item } = this.props;
    if (item.color) {
      return (<div className="description">${item.buy_price}</div>);
    }
    if (specialDescriptions.indexOf(item.category) > -1) {
      return (<div className={`description ${item.category}`}>{item.description}</div>);
    }
    return null;
  }

  render() {
    const { item, currentTurn } = this.props;
    const isEndSpace = (currentTurn.end_space_id || 0) === item.id;
    return (
      <div className={item.position % 10 === 0 ? 'corner' : 'tile'}>
        <div className={`tile-data ${isEndSpace ? 'end-space' : ''}`}>
          <TokenSpaces item={item} />
          <div className={`color ${item.color || 'no-color'}`} />
          {this.renderTitle()}
          <div className={`image ${item.category}`} />
          {this.renderDescription()}
        </div>
      </div>
    );
  }
}

GameTile.propTypes = {
  item: PropTypes.object.isRequired,
  currentTurn: PropTypes.object.isRequired,
};

const mapStateToProps = ({ turns }) => ({
  currentTurn: turns.items[0] || {},
});

export default connect(mapStateToProps, null)(GameTile);
