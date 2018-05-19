class Deed < ApplicationRecord
  validates :property_id, :game_id, presence: true
  validates :property_id, uniqueness: { scope: :owner_id }
  validates :property_id, uniqueness: { scope: :game_id }

  belongs_to :property
  belongs_to :game
  belongs_to :owner, class_name: 'Player', primary_key: :id, foreign_key: :owner_id
end
