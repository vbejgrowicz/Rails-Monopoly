import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get, apiRequest } from '../../utils/fetch';
import { fetchSpacesRequest, fetchSpacesReceived } from '../../actions';
import GameRow from './GameRow';

class GameBoard extends React.Component {
  componentWillMount() {
    this.props.fetchSpaces();
  }

  render() {
    const topItems = this.props.spaces.filter(space => space.position >= 20 && space.position <= 30);
    const leftItems = this.props.spaces.filter(space => space.position > 10 && space.position < 20).reverse();
    const rightItems = this.props.spaces.filter(space => space.position > 30 && space.position < 40);
    const bottomItems = this.props.spaces.filter(space => space.position >= 0 && space.position <= 10).reverse();
    return (
      <div className="board">
        <GameRow items={topItems} key="top" position="top" />
        <GameRow items={leftItems} key="left" position="left" />
        <GameRow items={[]} key="middle" position="middle" />
        <GameRow items={rightItems} key="right" position="right" />
        <GameRow items={bottomItems} key="bottom" position="bottom" />
      </div>
    );
  }
}

GameBoard.propTypes = {
  fetchSpaces: PropTypes.func.isRequired,
  spaces: PropTypes.array.isRequired,
};

const mapStateToProps = ({ spaces }) => ({
  spaces: spaces.items,
});

const mapDispatchToProps = dispatch => ({
  fetchSpaces: async () => {
    dispatch(fetchSpacesRequest());
    const getSpaces = () => get('/api/spaces');
    apiRequest(getSpaces, (json) => {
      dispatch(fetchSpacesReceived(json.spaces));
    });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(GameBoard);
