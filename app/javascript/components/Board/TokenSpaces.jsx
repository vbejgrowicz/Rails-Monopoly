import React from 'react';
import PropTypes from 'prop-types';

class TokenSpaces extends React.Component {
  renderJail() {
    return (
      <div className="token-area">
        <div className="in-jail">
          <div className="token-group one">
            <div className="token hat" />
            <div className="token cat" />
          </div>
          <div className="token-group two">
            <div className="token dog" />
            <div className="token boot" />
          </div>
          <div className="token-group three">
            <div className="token car" />
            <div className="token thimble" />
          </div>
        </div>
        <div className="just-visiting">
          <div className="left">
            <div className="token-group one">
              <div className="token hat" />
              <div className="token cat" />
              <div className="token dog" />
              <div className="token boot" />
            </div>
          </div>
          <div className="bottom">
            <div className="token-group two">
              <div className="token car" />
              <div className="token thimble" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderDefault() {
    return (
      <div className="token-area">
        <div className="token-group one">
          <div className="token hat" />
          <div className="token cat" />
        </div>
        <div className="token-group two">
          <div className="token dog" />
          <div className="token boot" />
        </div>
        <div className="token-group three">
          <div className="token car" />
          <div className="token thimble" />
        </div>
      </div>
    );
  }

  render() {
    const { item } = this.props;
    return item.category === 'in-jail' ? this.renderJail() : this.renderDefault();
  }
}

TokenSpaces.propTypes = {
  item: PropTypes.object.isRequired,
};

export default TokenSpaces;
