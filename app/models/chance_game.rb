class ChanceGame < ApplicationRecord
  validates :chance_card_id, :game_id, :times_used, presence: true
  validates :chance_card_id, uniqueness: { scope: :game_id }

  belongs_to :chance_card
  belongs_to :game
end
