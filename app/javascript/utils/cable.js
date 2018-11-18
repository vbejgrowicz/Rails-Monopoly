import ActionCable from 'actioncable';

const connectCable = () => ActionCable.createConsumer('ws://localhost:5000/cable');
const subscribe = (cable, channel, received, altIdentifier) => (
  cable.subscriptions.create(channel, {
    received,
    altIdentifier,
  })
);

export {
  connectCable,
  subscribe,
};
