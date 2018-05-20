import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GameRow from './GameRow';
import GameMiddle from './GameMiddle';

class GameBoard extends React.Component {
  render() {
    const topItems = this.props.spaces.filter(space => space.position >= 20 && space.position <= 30);
    const leftItems = this.props.spaces.filter(space => space.position > 10 && space.position < 20).reverse();
    const rightItems = this.props.spaces.filter(space => space.position > 30 && space.position < 40);
    const bottomItems = this.props.spaces.filter(space => space.position >= 0 && space.position <= 10).reverse();
    return this.props.spaces.length > 0 && (
      <div className="board">
        <GameRow items={topItems} key="top" position="top" />
        <GameRow items={leftItems} key="left" position="left" />
        <GameMiddle key="middle" />
        <GameRow items={rightItems} key="right" position="right" />
        <GameRow items={bottomItems} key="bottom" position="bottom" />
      </div>
    );
  }
}

GameBoard.propTypes = {
  spaces: PropTypes.array.isRequired,
};

const mapStateToProps = ({ spaces }) => ({
  spaces: spaces.items,
});

export default connect(mapStateToProps, null)(GameBoard);
