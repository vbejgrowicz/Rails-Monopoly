class PurchaseProperty
  def self.run(turn_action)
    new(turn_action).run
  end

  def initialize(turn_action)
    @turn_action = turn_action
  end

  def run
    property = @turn_action.turn.end_space.property
    deed = property.deed_for(@turn_action.turn.game)
    validate_deed_is_not_owned!
    validate_purchase_power!
    commit_purchase(deed)
  end

  private

  def commit_purchase(deed)
    deed.update!(owner_id: @turn_action.turn.player_id)
  end

  def validate_deed_is_not_owned!
  end

  def validate_purchase_power!
  end
end
