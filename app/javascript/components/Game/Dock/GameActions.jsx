import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class GameActions extends React.Component {
  render() {
    return (
      <div className="game-actions">
        <button className="action-btn">Game Details</button>
      </div>
    );
  }
}

GameActions.propTypes = {
};

const mapStateToProps = () => ({
});

export default connect(mapStateToProps, null)(GameActions);
