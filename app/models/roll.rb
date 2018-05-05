class Roll < ApplicationRecord
  validates :player_id, :die_one, :die_two, presence: true
  validates :die_one, :die_two, numericality: { greater_than: 0, less_than: 7 }

  belongs_to :player

  def total
    die_one + die_two
  end
end
