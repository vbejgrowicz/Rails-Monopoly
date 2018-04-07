class Player < ApplicationRecord
  validates :user_id, uniqueness: { scope: :game_id }

  belongs_to :game
  belongs_to :user
end
