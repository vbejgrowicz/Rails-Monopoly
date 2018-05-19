class Property < ApplicationRecord
  validates :name, :color_set_id, :buy_price, presence: true

  belongs_to :color_set

  # has_many :spaces
end
