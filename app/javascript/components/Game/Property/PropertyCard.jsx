import React from 'react';
import PropTypes from 'prop-types';

class PropertyCard extends React.Component {
  render() {
    return (
      <div className="property-card">
        <div className="property-data">
          <div className="title-group">
            <div className="title-deed">title deed</div>
            <div className="title-name">north carolina avenue</div>
          </div>
          <div className="rent-group">
            <div className="rent">
              <div className="rent-label">Rent</div>
              <div className="rent-price">$26</div>
            </div>
            <div className="rent">
              <div className="rent-label">Rent with color set</div>
              <div className="rent-price">$52</div>
            </div>
            <div className="rent">
              <div className="rent-label">Rent with <i className="fa fa-home house" /></div>
              <div className="rent-price">$130</div>
            </div>
            <div className="rent">
              <div className="rent-label">Rent with <i className="fa fa-home house" /><i className="fa fa-home house" /></div>
              <div className="rent-price">$390</div>
            </div>
            <div className="rent">
              <div className="rent-label">Rent with <i className="fa fa-home house" /><i className="fa fa-home house" /><i className="fa fa-home house" /></div>
              <div className="rent-price">$900</div>
            </div>
            <div className="rent">
              <div className="rent-label">Rent with <i className="fa fa-home house" /><i className="fa fa-home house" /><i className="fa fa-home house" /><i className="fa fa-home house" /></div>
              <div className="rent-price">$1100</div>
            </div>
            <div className="rent">
              <div className="rent-label">Rent with <i className="fa fa-home hotel" /></div>
              <div className="rent-price">$1275</div>
            </div>
          </div>
          <div className="cost-group">
            <div className="cost">
              <div className="cost-label">Houses cost</div>
              <div className="cost-price">$200 each</div>
            </div>
            <div className="cost">
              <div className="cost-label">Hotels cost</div>
              <div className="cost-price">$200 each <span>(plus 4 houses)</span></div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PropertyCard;
