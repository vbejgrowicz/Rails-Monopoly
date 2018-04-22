class Game < ApplicationRecord
  validates :host_id, presence: true

  belongs_to :host, class_name: 'User', primary_key: :id, foreign_key: :host_id

  has_many :players
  has_many :tokens, through: :players

  def is_player?(user_id)
    players.map(&:user_id).include?(user_id)
  end
end
