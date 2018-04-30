class CommunityChestCard < ApplicationRecord
  validates :description, presence: true

  has_many :community_chest_games
  has_many :games, through: :community_chest_games
end
