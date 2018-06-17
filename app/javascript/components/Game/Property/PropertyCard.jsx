import React from 'react';
import PropTypes from 'prop-types';

class PropertyCard extends React.Component {
  constructor() {
    super();

    this.state = { flip: false };

    this.renderCard = this.renderCard.bind(this);
    this.flip = this.flip.bind(this);
  }

  standardCard(item) {
    const { rent, rent_with_set, rent_with_one, rent_with_two,
      rent_with_three, rent_with_four, rent_with_hotel, build_cost,
    } = item.price_data;

    return (
      <div className="property-data">
        <div className={`title-group property-color ${item.color}`}>
          <div className="title-deed">title deed</div>
          <div className="title-name">{item.title}</div>
        </div>
        <div className="rent-group">
          <div className="rent">
            <div className="rent-label">Rent</div>
            <div className="rent-price">${rent}</div>
          </div>
          <div className="rent">
            <div className="rent-label">Rent with color set</div>
            <div className="rent-price">${rent_with_set}</div>
          </div>
          <div className="rent">
            <div className="rent-label">Rent with <i className="fa fa-home house" /></div>
            <div className="rent-price">${rent_with_one}</div>
          </div>
          <div className="rent">
            <div className="rent-label">Rent with <i className="fa fa-home house" /><i className="fa fa-home house" /></div>
            <div className="rent-price">${rent_with_two}</div>
          </div>
          <div className="rent">
            <div className="rent-label">Rent with <i className="fa fa-home house" /><i className="fa fa-home house" /><i className="fa fa-home house" /></div>
            <div className="rent-price">${rent_with_three}</div>
          </div>
          <div className="rent">
            <div className="rent-label">Rent with <i className="fa fa-home house" /><i className="fa fa-home house" /><i className="fa fa-home house" /><i className="fa fa-home house" /></div>
            <div className="rent-price">${rent_with_four}</div>
          </div>
          <div className="rent">
            <div className="rent-label">Rent with <i className="fa fa-home hotel" /></div>
            <div className="rent-price">${rent_with_hotel}</div>
          </div>
        </div>
        <div className="cost-group">
          <div className="cost">
            <div className="cost-label">Houses cost</div>
            <div className="cost-price">${build_cost} each</div>
          </div>
          <div className="cost">
            <div className="cost-label">Hotels cost</div>
            <div className="cost-price">${build_cost} each <span>(plus 4 houses)</span></div>
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

  flip() {
    this.setState({ flip: !this.state.flip });
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
      <div>
        <div className={`property-card flip-container ${this.state.flip ? 'flip' : ''}`}>
          <div className="flipper">
            <div className="front">
              {this.renderCard(item)}
            </div>
            <div className="back">
              <div className="property-data">
                <div className="back-title-group">{item.title}</div>
                <div className="mortgage-group">
                  <div>mortgage value ${item.price_data.mortgage_value}</div>
                  <div className="unmortgage-value">to unmortgage, pay ${item.price_data.mortgage_payoff}</div>
                </div>
                <div className="back-information">Card must be turned this side up if property is mortgaged.</div>
              </div>
            </div>
          </div>
        </div>
        <div className="flip-link">
          <span onClick={this.flip}>See Back</span>
        </div>
      </div>
    );
  }
}

PropertyCard.propTypes = {
  item: PropTypes.object.isRequired,
};

export default PropertyCard;
