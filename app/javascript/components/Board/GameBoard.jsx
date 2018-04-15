import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get, apiRequest } from '../../utils/fetch';
import { fetchSpacesRequest, fetchSpacesReceived } from '../../actions';

class GameBoard extends React.Component {
  componentWillMount() {
    this.props.fetchSpaces();
  }

  render() {
    return (
      <div className="board">
        <div className="row top">
          <div className="corner">Free Parking</div>
          <div className="tile">Space</div>
          <div className="tile">Space</div>
          <div className="tile">Space</div>
          <div className="tile">Space</div>
          <div className="tile">Space</div>
          <div className="tile">Space</div>
          <div className="tile">Space</div>
          <div className="tile">Space</div>
          <div className="corner">Go to Jail</div>
        </div>
        <div className="row left">
          <div className="tile"><div>Space</div></div>
          <div className="tile"><div>Space</div></div>
          <div className="tile"><div>Space</div></div>
          <div className="tile"><div>Space</div></div>
          <div className="tile"><div>Space</div></div>
          <div className="tile"><div>Space</div></div>
          <div className="tile"><div>Space</div></div>
          <div className="tile"><div>Space</div></div>
        </div>
        <div className="row middle" />
        <div className="row right">
          <div className="tile"><div>Space</div></div>
          <div className="tile"><div>Space</div></div>
          <div className="tile"><div>Space</div></div>
          <div className="tile"><div>Space</div></div>
          <div className="tile"><div>Space</div></div>
          <div className="tile"><div>Space</div></div>
          <div className="tile"><div>Space</div></div>
          <div className="tile"><div>Space</div></div>
        </div>
        <div className="row bottom">
          <div className="corner">Jail</div>
          <div className="tile">Space</div>
          <div className="tile">Space</div>
          <div className="tile">Space</div>
          <div className="tile">Space</div>
          <div className="tile">Space</div>
          <div className="tile">Space</div>
          <div className="tile">Space</div>
          <div className="tile">Space</div>
          <div className="corner">Go</div>
        </div>
      </div>
    );
  }
}

GameBoard.propTypes = {
  fetchSpaces: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  fetchSpaces: async () => {
    dispatch(fetchSpacesRequest());
    const getSpaces = () => get('/api/spaces');
    apiRequest(getSpaces, (json) => {
      dispatch(fetchSpacesReceived(json.spaces));
    });
  },
});

export default connect(null, mapDispatchToProps)(GameBoard);
