import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PlayerCard from './PlayerCard';
import PlayerActions from './PlayerActions';
import { get, apiRequest } from '../../../utils/fetch';
import { fetchTurnsRequest, fetchTurnsReceived } from '../../../actions';

class GameDock extends React.Component {
  constructor() {
    super();

    this.state = { loading: true };

    this.fetchTurns = this.fetchTurns.bind(this);
  }

  componentWillMount() {
    this.fetchTurns();
  }

  fetchTurns = async () => {
    const { json } = await this.props.fetchTurns();
    if (json.turns) {
      this.setState({ loading: false })
    }
  }

  render() {
    return !this.state.loading && (
      <div className="dock">
        <div className="players">
          {this.props.players.map(player => <PlayerCard key={player.id} player={player} />)}
        </div>
        <PlayerActions turnSub={this.turnSub} playerSub={this.playerSub} />
      </div>
    );
  }
}

GameDock.propTypes = {
  players: PropTypes.array.isRequired,
  fetchTurns: PropTypes.func.isRequired,
};

const mapStateToProps = ({ activeGame }) => ({
  players: activeGame.players,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  fetchTurns: async () => {
    const gameId = ownProps.match.params.id;
    dispatch(fetchTurnsRequest());
    const getTurns = () => get(`/api/games/${gameId}/turns`);
    return apiRequest(getTurns, (json) => {
      dispatch(fetchTurnsReceived(json.turns));
    });
  },
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GameDock));
