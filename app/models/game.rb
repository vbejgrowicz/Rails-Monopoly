class Game < ApplicationRecord
  validates :host_id, presence: true

  belongs_to :host, class_name: 'User', primary_key: :id, foreign_key: :host_id

  has_many :players, dependent: :destroy
  has_many :tokens, through: :players

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
end
