class TurnAction < ApplicationRecord
  validates :turn_id, :action_id, presence: true
  validates :completed, inclusion: { in: [true, false] }

  belongs_to :turn
  belongs_to :action
end