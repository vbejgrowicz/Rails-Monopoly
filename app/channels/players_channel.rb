class PlayersChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'players'
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def receive(data)
    ActionCable.server.broadcast('players', data)
  end
end
