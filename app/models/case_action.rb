class CaseAction < ApplicationRecord
  validates :actionable_id, :actionable_type, :action_id, presence: true
  validates :action_id, uniqueness: { scope: [:actionable_id, :actionable_type] }

  belongs_to :actionable, polymorphic: true
  belongs_to :action
end
