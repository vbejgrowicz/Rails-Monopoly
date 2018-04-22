class Token < ApplicationRecord
  validates :name, presence: true, uniqueness: true

  has_many :players
end
