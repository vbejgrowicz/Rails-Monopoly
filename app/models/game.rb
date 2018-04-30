class Game < ApplicationRecord
  validates :host_id, presence: true

  validate :locked_game_must_have_more_than_one_player

  belongs_to :host, class_name: 'User', primary_key: :id, foreign_key: :host_id

  has_many :players, dependent: :destroy
  has_many :tokens, through: :players
  has_many :chance_games, dependent: :destroy
  has_many :chance_cards, through: :chance_games
  has_many :community_chest_games, dependent: :destroy
  has_many :community_chest_cards, through: :community_chest_games

  def is_player?(user_id)
    players.map(&:user_id).include?(user_id)
  end

  def is_host?(user_id)
    host_id == user_id
  end

  def available_tokens
    Token.where.not(id: players.map(&:token_id))
  end

  def ordered_players
    return Player.ordered_by_first_roll(id) if started_at
    players.order(created_at: :asc)
  end

  private

  def locked_game_must_have_more_than_one_player
    if locked_at.present? && players.count <= 1
      errors[:base] << 'Game must have more than 1 player'
    end
  end
end
