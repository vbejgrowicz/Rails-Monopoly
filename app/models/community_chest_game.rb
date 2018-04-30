class CommunityChestGame < ApplicationRecord
  validates :community_chest_card_id, :game_id, :times_used, presence: true
  validates :community_chest_card_id, uniqueness: { scope: :game_id }

  belongs_to :community_chest_card
  belongs_to :game
end
