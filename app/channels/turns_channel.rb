class TurnsChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'turns'
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def receive(data)
    ActionCable.server.broadcast('turns', data)
  end
end
