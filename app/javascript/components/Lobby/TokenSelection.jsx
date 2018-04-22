import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { get, apiRequest } from '../../utils/fetch';

class TokenSelection extends React.Component {
  constructor() {
    super();
    this.state = { loading: true, game: null };
  }

  fetchGame = async () => {
    const { json, error } = await this.props.fetchGame(this.props.gameId);
    if (json.game) {
      this.setState({ game: json.game, loading: false });
    }
    if (error) {
      this.props.onClickClose();
    }
  }

  componentWillMount() {
    this.fetchGame();
  }

  render() {
    return this.state.loading ? (<div>loading...</div>) : (
      <div className="outer-modal">
        <div className="modal">
          <h2>Tokens</h2>
          <div className="close" onClick={this.props.onClickClose}><span>x</span></div>
          {this.state.game.available_tokens.map((token) => (
            <div key={token.id}>{token.name}</div>
          ))}
        </div>
      </div>
    );
  }
}

TokenSelection.propTypes = {
  gameId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onClickClose: PropTypes.func.isRequired,
  fetchGame: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  fetchGame: async (id) => {
    const fetchGame = () => get(`/api/games/${id}?join_request=true`);
    return apiRequest(fetchGame, (json) => {
      return json;
    });
  },
});

export default connect(null, mapDispatchToProps)(TokenSelection);
