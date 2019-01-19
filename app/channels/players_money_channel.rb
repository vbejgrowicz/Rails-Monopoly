class PlayersMoneyChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'players_money'
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def receive(data)
    ActionCable.server.broadcast('players_money', data)
  end
end
