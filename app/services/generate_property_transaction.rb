class GeneratePropertyTransaction
  def self.run(turn_action, deed)
    new(turn_action, deed).run
  end

  def initialize(turn_action, deed)
    @turn_action = turn_action
    @deed = deed
  end

  def run
    create_purchase_transaction! if @turn_action.buy?
    create_rent_transaction! if @turn_action.pay?
  end

  def create_purchase_transaction!
    GameTransaction.create!(
      turn_action_id: @turn_action.id,
      deed_id: @deed.id,
      transaction_type: 'purchase',
      sender_id: @turn_action.turn.player_id,
      receiver_id: nil,
      amount: @deed.property.buy_price,
    )
  end

  def create_rent_transaction!
    GameTransaction.create!(
      turn_action_id: @turn_action.id,
      deed_id: @deed.id,
      transaction_type: 'rent',
      sender_id: @turn_action.turn.player_id,
      receiver_id: @deed.owner_id,
      amount: @deed.property.buy_price, # TODO: rent prices
    )
  end
end
