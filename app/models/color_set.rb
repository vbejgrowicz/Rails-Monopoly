class ColorSet < ApplicationRecord
  validates :color, presence: true

  has_many :properties
end
