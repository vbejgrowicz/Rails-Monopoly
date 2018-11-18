class PropertiesChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'properties'
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def receive(data)
    ActionCable.server.broadcast('properties', data)
  end
end
