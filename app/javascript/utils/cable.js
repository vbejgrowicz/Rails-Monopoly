import ActionCable from 'actioncable';

const connectCable = () => ActionCable.createConsumer('ws://localhost:5000/cable');
const subscribe = (cable, channel, received) => (
  cable.subscriptions.create(channel, { received })
);

export {
  connectCable,
  subscribe,
};
