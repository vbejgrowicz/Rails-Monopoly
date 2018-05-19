import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import GameTile from '../Board/GameTile';

class ActionModal extends React.Component {
  render() {
    const { spaces, item } = this.props;
    return spaces.items.length > 0 && (
      <div className="outer-modal action">
        <div className="modal">
          <div className="contents">
            <GameTile item={item} shouldShowTokens={false} />
            <button>Action</button>
          </div>
        </div>
      </div>
    );
  }
}

ActionModal.propTypes = {
  item: PropTypes.object,
  spaces: PropTypes.object.isRequired,
};

ActionModal.defaultProps = {
  item: {},
};

const mapStateToProps = ({ spaces, turns }) => ({
  spaces,
  item: spaces.items.find(space => space.id === turns.items[0].end_space_id),
});

const mapDispatchToProps = dispatch => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(ActionModal);
