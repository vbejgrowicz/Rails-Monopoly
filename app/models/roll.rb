class Roll < ApplicationRecord
  validates :player_id, :die_one, :die_two, presence: true
  validates :die_one, :die_two, numericality: { greater_than: 0, less_than: 7 }

  belongs_to :player

  scope :ordered_for_player, ->(player_id) {
    where(player_id: player_id)
      .order(id: :asc)
  }
end
