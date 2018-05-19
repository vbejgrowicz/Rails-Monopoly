class GenerateAction
  def self.run(turn)
    new(turn).run
  end

  def initialize(turn)
    @turn = turn
    @player = turn.player
    @tile = @player.space.tile
  end

  def run
    TurnAction.create!(turn_id: @turn.id, action_id: find_action_from_tile.id)
  end

  private

  def find_action_from_tile
    if @tile.is_property?
      deed = @tile.deed_for(@turn.game)
      return Action.buy if deed.is_unowned?
      return Action.none if deed.is_owned_by_player?(@player)
      Action.pay
    else
      Event.get_action_for(@tile)
    end
  end
end
