class GenerateActionFromTile
  def self.run(turn)
    new(turn).run
  end

  def initialize(turn)
    @turn = turn
    @player = turn.player
    @tile = @player.space.tile
  end

  def run
    turn_action = TurnAction.create!(turn_id: @turn.id, action_id: find_action_from_tile.id)
    if @tile.is_property?
      GeneratePropertyTransaction.run(turn_action, deed)
    end
  end

  private

  def find_action_from_tile
    if @tile.is_property?
      return Action.buy if deed.is_unowned?
      return Action.none if deed.is_owned_by_player?(@player)
      Action.pay
    else
      Event.get_action_for(@tile)
    end
  end

  def deed
    @deed ||= @tile.deed_for(@turn.game)
  end
end
