class Player < ApplicationRecord
  validates :user_id, :game_id, :token_id, :space_id, presence: true
  validates :user_id, uniqueness: { scope: :game_id }
  validates :token_id, uniqueness: { scope: :game_id }
  validates :space_id, uniqueness: { scope: [:game_id, :user_id] }

  validate :game_has_six_or_fewer_players

  belongs_to :game
  belongs_to :user
  belongs_to :token
  belongs_to :space

  has_many :rolls, dependent: :destroy

  scope :ordered_by_first_roll, ->(game_id) {
    select('players.*, coalesce(rolls.die_one, 0) + coalesce(rolls.die_two, 0) as die_total')
      .joins(:rolls)
      .where(game_id: game_id)
      .order('die_total desc, players.created_at asc')
  }

  def first_roll
    Roll.ordered_for_player(id).first || {}
  end

  private

  def game_has_six_or_fewer_players
    if game.players.count === 6
      errors[:base] << "Game can't have more than 6 players"
    end
  end
end
