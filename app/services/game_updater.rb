class GameUpdater
  def self.run_create(current_user, params)
    ActiveRecord::Base.transaction do
      game = Game.create!(host_id: current_user.id)
      Player.create!(game_id: game.id, token_id: params[:token_id], user_id: game.host_id)
      game
    end
  end

  def self.run_update(game, params)
    game.update!(params)
    game
  end
end
