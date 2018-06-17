import React from 'react';
import PropTypes from 'prop-types';

class PropertyCard extends React.Component {
  constructor() {
    super();

    this.renderCard = this.renderCard.bind(this);
  }

  standardCard(item) {
    return (
      <div className="property-data">
        <div className={`title-group property-color ${item.color}`}>
          <div className="title-deed">title deed</div>
          <div className="title-name">{item.title}</div>
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
    );
  }

  railroadCard(item) {
    return (
      <div className="property-data">
        <div className={`property-image ${item.category}`} />
        <div className="railroad-name">{item.title}</div>
        <div className="rent-group railroad">
          <div className="rent">
            <div className="rent-label">RENT</div>
            <div className="rent-price">$25</div>
          </div>
          <div className="rent">
            <div className="rent-label">If 2 Railroads are owned</div>
            <div className="rent-price">$50</div>
          </div>
          <div className="rent">
            <div className="rent-label">If 3 Railroads are owned</div>
            <div className="rent-price">$100</div>
          </div>
          <div className="rent">
            <div className="rent-label">If 4 Railroads are owned</div>
            <div className="rent-price">$200</div>
          </div>
        </div>
      </div>
    );
  }

  utilityCard(item) {
    return (
      <div className="property-data">
        <div className={`property-image ${item.category}`} />
        <div className="utility-name">{item.title}</div>
        <div className="rent-description">
          <div>If one Utility is owned, rent is 4 times amount shown on dice.</div>
          <div>If both Utilities are owned, rent is 10 times amount shown on dice.</div>
        </div>
      </div>
    );
  }

  renderCard(item) {
    if (item.color === 'black') {
      return this.railroadCard(item);
    } else if (item.color === 'white') {
      return this.utilityCard(item);
    }
    return this.standardCard(item);
  }

  render() {
    const { item } = this.props;
    return (
      <div className="property-card">
        {this.renderCard(item)}
      </div>
    );
  }
}

PropertyCard.propTypes = {
  item: PropTypes.object.isRequired,
};

export default PropertyCard;
