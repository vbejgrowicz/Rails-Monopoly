module CardActionable
  extend ActiveSupport::Concern

  included do
    def self.joined_assoc
      to_s.gsub('Card', '').underscore + '_games'
    end

    validates :description, presence: true

    belongs_to :action
    has_many joined_assoc.to_sym, dependent: :destroy
    has_many :games, through: joined_assoc.to_sym
  end

  module ClassMethods
    def joined_attr
      (to_s.gsub('Card', '').underscore + '_card_id').to_sym
    end

    def shuffle_and_save_for_game!(game_id)
      all.shuffle.each do |card|
        join_class = joined_assoc.classify.constantize
        attrs = { game_id: game_id }
        attrs[joined_attr] = card.id
        join_class.create!(attrs)
      end
    end

    def get_top_card_for_game(game_id)
      joins(joined_assoc.to_sym)
        .where("#{joined_assoc}.game_id = ?", game_id)
        .order("#{joined_assoc}.times_used asc, #{joined_assoc}.id asc")
        .first
    end
  end
end
