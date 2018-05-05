class Turn < ApplicationRecord
  validates :player_id, :game_id, presence: true
  validates :completed, inclusion: { in: [true, false] }

  belongs_to :player
  belongs_to :game
  belongs_to :roll, optional: true
  belongs_to :start_space, class_name: 'Space', primary_key: :id, foreign_key: :start_space_id, optional: true
  belongs_to :end_space, class_name: 'Space', primary_key: :id, foreign_key: :end_space_id, optional: true
end
