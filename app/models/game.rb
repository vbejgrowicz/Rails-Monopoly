class Game < ApplicationRecord
  validates :host_id, presence: true

  belongs_to :host, class_name: User, primary_key: :id, foreign_key: :host_id
end
