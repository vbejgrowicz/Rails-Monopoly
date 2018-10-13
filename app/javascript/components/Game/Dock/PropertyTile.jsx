import React from 'react';
import PropTypes from 'prop-types';

class PropertyTile extends React.Component {
  render() {
    const { color, owner, name, visible } = this.props;
    const propColor = `property-color ${color}`;
    const ownerClass = owner.id ? `player-border-color ${owner.token}` : 'unowned';
    return (
      <div className={`${propColor} ${ownerClass} ${!visible ? 'invisible' : ''}`}>
        {name}
      </div>
    );
  }
}

PropertyTile.propTypes = {
  color: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  owner: PropTypes.object.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default PropertyTile;
