class GenerateActionFromCard
  def self.run(turn, card)
    new(turn, card).run
  end

  def initialize(turn, card)
    @turn = turn
    @card = card
  end

  def run
    TurnAction.create!(turn_id: @turn.id, action_id: card.action_id)
  end
end
