class ChanceCard < ApplicationRecord
  validates :description, presence: true

  has_many :chance_games
  has_many :games, through: :chance_games
end
