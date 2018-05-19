class Property < ApplicationRecord
  validates :name, :color_set_id, :buy_price, presence: true

  belongs_to :color_set

  # has_many :spaces
  has_many :case_actions, as: :actionable
end
