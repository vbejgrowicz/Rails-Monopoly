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
  has_many :turns

  scope :ordered_by_first_roll, ->(game_id) {
    select('players.*, coalesce(rolls.die_one, 0) + coalesce(rolls.die_two, 0) as die_total')
      .joins(:rolls)
      .where(game_id: game_id)
      .where('rolls.first_roll = true')
      .order('die_total desc, players.created_at asc')
  }

  def first_roll
    Roll.find_by(player_id: id, first_roll: true) || {}
  end

  def move_to(end_space_id)
    update!(space_id: end_space_id)
  end
end
