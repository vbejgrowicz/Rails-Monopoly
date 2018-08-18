class PurchaseProperty
  def self.run(turn_action)
    new(turn_action).run
  end

  def initialize(turn_action)
    @turn_action = turn_action
  end

  def run
    @property = @turn_action.turn.end_space.property
    @deed = @property.deed_for(@turn_action.turn.game)
    @player = @turn_action.turn.player
    validate_deed_is_not_owned!
    validate_purchase_power!
    commit_purchase!
  end

  private

  def commit_purchase!
    ActiveRecord::Base.transaction do
      @deed.update!(owner_id: @player.id)
      @player.update!(money: @player.money - @property.buy_price)
      @turn_action.game_transaction.update!(completed: true)
    end
  end

  def validate_deed_is_not_owned!
    raise 'This property is already owned!' if @deed.owner_id.present?
  end

  def validate_purchase_power!
    return if @player.money >= @property.buy_price
    raise "You're a bit short on funds!"
  end
end
