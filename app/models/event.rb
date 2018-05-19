class Event < ApplicationRecord
  validates :name, presence: true

  has_many :spaces

  EVENT_ACTIONS = {
    'Community Chest' => 'draw',
    'Chance' => 'draw',
    'Income Tax' => 'pay',
    'In Jail' => 'none',
    'Free Parking' => 'none',
    'Go To Jail' => 'move',
    'Luxury Tax' => 'pay',
    'Go' => 'receive',
  }.freeze

  def self.get_action_for(event)
    Action.find_by(name: EVENT_ACTIONS[event.name])
  end

  def is_property?
    false
  end
end
