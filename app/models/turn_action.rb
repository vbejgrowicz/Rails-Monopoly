class TurnAction < ApplicationRecord
  validates :turn_id, :action_id, presence: true
  validates :completed, inclusion: { in: [true, false] }

  belongs_to :turn
  belongs_to :action

  has_one :game_transaction

  def buy?
    action.name == 'buy'
  end

  def pay?
    action.name == 'pay'
  end
end
