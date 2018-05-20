import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { get, apiRequest } from '../../utils/fetch';
import { fetchGameRequest, fetchGameReceived, fetchSpacesRequest,
  fetchSpacesReceived, fetchTurnsRequest, fetchTurnsReceived,
} from '../../actions';

class GameLoader extends React.Component {
  constructor() {
    super();

    this.state = {
      loadingSpaces: true,
      loadingGame: true,
      loadingTurns: true,
    };
  }

  componentWillMount() {
    this.fetchGameData();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.shouldReloadTurns !== this.props.shouldReloadTurns) {
      this.setState({ loadingTurns: true });
      this.props.fetchTurns().then(({ success: turnSuccess }) => {
        this.setState({ loadingTurns: !turnSuccess });
      });
    }
  }

  fetchGameData() {
    this.props.fetchGame().then(({ success: gameSuccess }) => {
      if (gameSuccess) {
        this.setState({ loadingGame: !gameSuccess });
        this.props.fetchSpaces().then(({ success: spaceSuccess }) => {
          this.setState({ loadingSpaces: !spaceSuccess });
        });
        this.props.fetchTurns().then(({ success: turnSuccess }) => {
          this.setState({ loadingTurns: !turnSuccess });
        });
      }
    });
  }

  render() {
    const { children } = this.props;
    const { loadingSpaces, loadingGame, loadingTurns } = this.state;
    const loading = loadingGame || loadingSpaces || loadingTurns;
    return loading ? <div>Loading...</div> : <div>{children}</div>;
  }
}

GameLoader.propTypes = {
  children: PropTypes.node.isRequired,
  shouldReloadTurns: PropTypes.bool.isRequired,
  fetchGame: PropTypes.func.isRequired,
  fetchSpaces: PropTypes.func.isRequired,
  fetchTurns: PropTypes.func.isRequired,
};

const mapStateToProps = ({ activeGame }) => ({
  shouldReloadTurns: activeGame.shouldReloadTurns,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchGame: async () => {
    const gameId = ownProps.match.params.id;
    dispatch(fetchGameRequest(gameId));
    const getGame = () => get(`/api/games/${gameId}`);
    const status = await apiRequest(getGame, (json) => {
      dispatch(fetchGameReceived(json.game));
    });
    if (status.error) {
      ownProps.history.push('/lobby');
    }
    return status;
  },
  fetchSpaces: async () => {
    dispatch(fetchSpacesRequest());
    const getSpaces = () => get('/api/spaces');
    return apiRequest(getSpaces, (json) => {
      dispatch(fetchSpacesReceived(json.spaces));
    });
  },
  fetchTurns: async () => {
    const gameId = ownProps.match.params.id;
    dispatch(fetchTurnsRequest());
    const getTurns = () => get(`/api/games/${gameId}/turns`);
    return apiRequest(getTurns, (json) => {
      dispatch(fetchTurnsReceived(json.turns));
    });
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GameLoader));
