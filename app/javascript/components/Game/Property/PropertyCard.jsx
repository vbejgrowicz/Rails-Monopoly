import React from 'react';
import PropTypes from 'prop-types';

class PropertyCard extends React.Component {
  render() {
    return (
      <div className="property-card">
        <div className="border">
          <div className="title">Title</div>
          <div className="rent">Rent</div>
          <div className="house">House</div>
        </div>
      </div>
    );
  }
}

export default PropertyCard;
