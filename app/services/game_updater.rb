class GameUpdater
  def self.run_create(current_user, params)
    ActiveRecord::Base.transaction do
      game = Game.create!(host_id: current_user.id)
      Player.create!(game_id: game.id, token_id: params[:token_id], user_id: game.host_id)
      Deed.generate_for_game!(game.id)
      [CommunityChestCard, ChanceCard].each { |deck| deck.shuffle_and_save_for_game!(game.id) }
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
      GenerateTurn.run_first(@game) if @params[:started_at].present?
      @game
    end
  end
end
