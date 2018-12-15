class DrawCard
  DRAW_CARD_TO_CLASS = {
    "Community Chest" => CommunityChestCard,
    "Chance" => ChanceCard
  }.freeze

  def self.run(turn_action)
    new(turn_action).run
  end

  def initialize(turn_action)
    @turn_action = turn_action
  end

  def run
    event_name = @turn_action.turn.end_space.event.name
    draw_class = DRAW_CARD_TO_CLASS[event_name]
    if draw_class
      # card = draw_class.get_top_card_for_game(@turn_action.turn.game_id)
      # GenerateActionFromCard(@turn_action.turn, card)
    end
  end
end
