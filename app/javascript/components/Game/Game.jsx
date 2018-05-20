import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import GameBoard from './Board/GameBoard';
import GameSetup from './Setup/GameSetup';
import GameDock from './Dock/GameDock';
import GameLoader from './GameLoader';
import ActionModal from './Action/ActionModal';

class Game extends React.Component {
  render() {
    const { inSetup } = this.props;
    return (
      <GameLoader>
        <div className={`game ${inSetup && 'pending'}`}>
          {inSetup && <GameSetup />}
          <GameBoard />
          {!inSetup &&
            [
              <GameDock key="game dock" />,
              <ActionModal key="action modal" />,
            ]
          }
        </div>
      </GameLoader>
    );
  }
}

Game.propTypes = {
  inSetup: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ activeGame }) => ({
  inSetup: !activeGame.started_at,
});

export default connect(mapStateToProps, null)(Game);
