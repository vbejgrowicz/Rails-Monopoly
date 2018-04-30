class ChanceCard < ApplicationRecord
  validates :description, presence: true

  has_many :chance_games
  has_many :games, through: :chance_games

  def self.shuffle_and_save_for_game!(game_id)
    all.shuffle.each do |card|
      ChanceGame.create!(chance_card_id: card.id, game_id: game_id)
    end
  end
end
