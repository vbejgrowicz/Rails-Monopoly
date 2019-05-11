import React from 'react';
import PropTypes from 'prop-types';
import GameTile from '../Board/GameTile';
import PropertyCard from '../Property/PropertyCard';
import EventCard from '../Event/EventCard';

const ActionDisplay = ({ card, actionSpace, properties }) => {
  if (card.card_type) {
    return <EventCard type={card.card_type} description={card.description} />;
  }
  if (actionSpace.is_property) {
    return <PropertyCard item={properties.find(prop => prop.id === actionSpace.property_id)} />;
  }
  return <GameTile item={actionSpace} shouldShowTokens={false} />;
};

ActionDisplay.propTypes = {
  actionSpace: PropTypes.object.isRequired,
  properties: PropTypes.array.isRequired,
  card: PropTypes.object.isRequired,
};

export default ActionDisplay;
