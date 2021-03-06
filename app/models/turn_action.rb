class TurnAction < ApplicationRecord
  validates :turn_id, :action_id, presence: true
  validates :completed, inclusion: { in: [true, false] }

  belongs_to :turn
  belongs_to :action
  belongs_to :card, polymorphic: true, optional: true

  has_one :game_transaction

  def buy?
    action.name == 'buy'
  end

  def pay?
    action.name == 'pay'
  end

  def draw?
    action.name == 'draw'
  end

  def receive?
    action.name == 'receive'
  end

  def move?
    action.name == 'move'
  end
end
