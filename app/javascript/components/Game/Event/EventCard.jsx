import React from 'react';
import PropTypes from 'prop-types';

class EventCard extends React.Component {
  render() {
    const { type, description } = this.props;
    return (
      <div className="event-card">
        <div className="event-title">{type}</div>
        <div className="event-body">
          <div className="event-left">{description}</div>
          <div className="event-right" />
        </div>
      </div>
    );
  }
}

EventCard.propTypes = {
  type: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default EventCard;
