class Player < ApplicationRecord
  validates :user_id, :game_id, :token_id, :space_id, presence: true
  validates :user_id, uniqueness: { scope: :game_id }
  validates :token_id, uniqueness: { scope: :game_id }
  validates :space_id, uniqueness: { scope: [:game_id, :user_id] }

  belongs_to :game
  belongs_to :user
  belongs_to :token
  belongs_to :space

  has_many :rolls, dependent: :destroy

  def first_roll
    Roll.ordered_for_player(id).first || {}
  end
end
