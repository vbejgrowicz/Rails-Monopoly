class GenerateActionFromCard
  def self.run(turn, card)
    new(turn, card).run
  end

  def initialize(turn, card)
    @turn = turn
    @card = card
  end

  def run
    turn_action = TurnAction.create!(turn_id: @turn.id, action_id: @card.action_id, card_id: @card.id)
    if turn_action.pay?
      GameTransaction.create!(
        turn_action_id: turn_action.id,
        transaction_type: 'bank_transaction',
        sender_id: @turn.player_id,
        amount: 100, # TODO: amounts should be based off card
      )
    elsif turn_action.receive?
      GameTransaction.create!(
        turn_action_id: turn_action.id,
        transaction_type: 'bank_transaction',
        receiver_id: @turn.player_id,
        amount: 100, # TODO: amounts should be based off card
      )
    elsif turn_action.move?
      # TODO: movement transaction or something similar?
    else
      # TODO: nil action?
    end
    game_card = @card.send(@card.class.joined_assoc).find_by(game_id: @turn.game_id)
    game_card.update!(times_used: game_card.times_used + 1)
  end
end
