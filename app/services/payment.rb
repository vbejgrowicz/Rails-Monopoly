class Payment
  attr_reader :sender, :receiver

  def self.run(turn_action)
    new(turn_action).run
  end

  def initialize(turn_action)
    @turn_action = turn_action
  end

  def run
    @sender = @turn_action.game_transaction.sender
    @receiver = @turn_action.game_transaction.receiver
    @amount = @turn_action.game_transaction.amount
    validate_pay_power!
    commit_pay!
    self
  end

  private

  def commit_pay!
    ActiveRecord::Base.transaction do
      @sender.update!(money: @sender.money - @amount) if @sender
      @receiver.update!(money: @receiver.money + @amount) if @receiver
      @turn_action.game_transaction.update!(completed: true)
    end
  end

  def validate_pay_power!
    return unless @sender
    return if @sender.money >= @amount
    raise "You're a bit short on funds!"
  end
end
