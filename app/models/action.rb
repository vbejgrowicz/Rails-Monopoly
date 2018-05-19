class Action < ApplicationRecord
  validates :name, presence: true

  find_each do |x|
    define_singleton_method(x.name.to_sym) { x }
  end
end
