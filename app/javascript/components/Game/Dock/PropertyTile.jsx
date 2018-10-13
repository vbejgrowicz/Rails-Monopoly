import React from 'react';
import PropTypes from 'prop-types';

class PropertyTile extends React.Component {
  render() {
    const { color, owner, name } = this.props;
    const propColor = `property-color ${color}`;
    const ownerClass = owner.id ? `player-border-color ${owner.token}` : 'unowned';
    return (
      <div className={`${propColor} ${ownerClass}`}>
        {name}
      </div>
    );
  }
}

PropertyTile.propTypes = {
  color: PropTypes.string.isRequired,
  owner: PropTypes.object,
  name: PropTypes.string.isRequired,
};

PropertyTile.defaultProps = {
  owner: {},
};

export default PropertyTile;
