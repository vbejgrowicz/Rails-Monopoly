class Event < ApplicationRecord
  validates :name, presence: true

  has_many :spaces
  def is_property?
    false
  end
end
