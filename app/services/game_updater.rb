class GameUpdater
  def self.run_create(current_user, params)
    ActiveRecord::Base.transaction do
      game = Game.create!(host_id: current_user.id)
      Player.create!(game_id: game.id, token_id: params[:token_id], user_id: game.host_id)
      game
    end
  end

  def self.run_update(game, params)
    new(game, params).update!
  end

  def initialize(game, params)
    @game = game
    @params = params
  end

  def update!
    ActiveRecord::Base.transaction do
      @game.update!(@params)
      generate_first_turn! if @params[:started_at].present?
      @game
    end
  end

  def generate_first_turn!
    player = Player.ordered_by_first_roll(@game.id).first
    Turn.create!(game_id: @game.id, player_id: player.id, start_space_id: player.space.id)
  end
end
