class GenerateActionFromCard
  def self.run(turn, card)
    new(turn, card).run
  end

  def initialize(turn, card)
    @turn = turn
    @card = card
  end

  def run
    TurnAction.create!(turn_id: @turn.id, action_id: @card.action_id)
    game_card = @card.send(@card.class.joined_assoc).find_by(game_id: @turn.game_id)
    game_card.update!(times_used: game_card.times_used + 1)
  end
end
