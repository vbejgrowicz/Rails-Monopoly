class Property < ApplicationRecord
  validates :name, :color_set_id, :buy_price, presence: true

  belongs_to :color_set

  def is_property?
    true
  end

  def deed_for(game)
    game.deeds.find_by(property_id: id)
  end
end
