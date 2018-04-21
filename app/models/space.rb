class Space < ApplicationRecord
  validates :position, presence: true, uniqueness: true

  belongs_to :property, optional: true
  belongs_to :event, optional: true

  def tile
    property || event
  end
end
