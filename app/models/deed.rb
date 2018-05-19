class Deed < ApplicationRecord
  validates :property_id, :game_id, presence: true
  validates :property_id, uniqueness: { scope: :owner_id }
  validates :property_id, uniqueness: { scope: :game_id }

  belongs_to :property
  belongs_to :game
  belongs_to :owner, class_name: 'Player', primary_key: :id, foreign_key: :owner_id, optional: true

  def self.generate_for_game!(game_id)
    Property.find_each { |prop| create!(property_id: prop.id, game_id: game_id) }
  end
end
