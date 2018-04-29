class Player < ApplicationRecord
  validates :user_id, uniqueness: { scope: :game_id }
  validates :token_id, uniqueness: { scope: :game_id }

  belongs_to :game
  belongs_to :user
  belongs_to :token

  has_many :rolls, dependent: :destroy

  def first_roll
    Roll.ordered_for_player(id).first || {}
  end
end
