import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { get, apiRequest } from '../../utils/fetch';

class TokenSelection extends React.Component {
  constructor() {
    super();
    this.state = { loading: true, game: null, token_id: null };

    this.setSelected = this.setSelected.bind(this);
  }

  componentWillMount() {
    this.fetchGame();
  }

  setSelected(token) {
    this.setState({ token_id: token.id });
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

  render() {
    const { token_id, loading, game } = this.state;
    return loading ? (<div>loading...</div>) : (
      <div className="outer-modal">
        <div className="modal token-selection">
          <h2>Select Your Token</h2>
          <div className="close" onClick={this.props.onClickClose}><span>x</span></div>
          <div style={{ padding: '5px' }}>
            {game.available_tokens.map(token => (
              <div key={token.id} className={`token ${token.name} ${token.id === token_id ? 'selected' : ''}`} onClick={() => this.setSelected(token)} />
            ))}
          </div>
          <div className="action">
            <button className="submit" onClick={() => this.props.onSubmit({ token_id: this.state.token_id })} disabled={!this.state.token_id}>
              {this.props.gameId === 'new' ? 'Create Game' : 'Join Game'}
            </button>
          </div>
          {game.available_tokens.length <= 2 && (
            <div className="warning">
              Warning: Looks like this game might be full! Try refreshing the page to get the latest open games.
            </div>
          )}
        </div>
      </div>
    );
  }
}

TokenSelection.propTypes = {
  gameId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onClickClose: PropTypes.func.isRequired,
  fetchGame: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

const mapDispatchToProps = () => ({
  fetchGame: async (id) => {
    const fetchGame = () => get(`/api/games/${id}?join_request=true`);
    return apiRequest(fetchGame, json => json);
  },
});

export default connect(null, mapDispatchToProps)(TokenSelection);
