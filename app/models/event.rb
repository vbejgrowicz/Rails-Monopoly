class Event < ApplicationRecord
  validates :name, presence: true

  has_many :spaces
  has_many :case_actions, as: :actionable
end
