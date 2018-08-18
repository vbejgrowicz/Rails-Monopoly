class GamePresenter < ApplicationPresenter
  def initialize(object, detailed: false, players: nil)
    @object = object
    @detailed = detailed
    @players = players
  end

  def as_json(*)
    json = base_view
    json.merge!(detailed_view) if @detailed
    json.merge!(lobby_view) unless @detailed
    json
  end

  def base_view
    {
      id: @object.id,
      host_id: @object.host_id,
    }
  end

  def lobby_view
    {
      created_at: Time.at(@object.created_at).strftime('%m/%d/%Y at %I:%M%p'),
      players: @object.players.count,
    }
  end

  def detailed_view
    {
      started_at: @object.started_at,
      locked_at: @object.locked_at,
      players: @players.map { |player| PlayerPresenter.new(player) }
    }
  end
end
