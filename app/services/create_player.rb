class CreatePlayer
  def self.run(game_id, token_id, user_id)
    new(game_id, token_id, user_id).run
  end

  def initialize(game_id, token_id, user_id)
    @game_id = game_id
    @game = Game.find(game_id)
    @token_id = token_id
    @user_id = user_id
  end

  def run
    validate_game_not_locked!
    validate_game_not_full!
    Player.create!(game_id: @game_id, token_id: @token_id, user_id: @user_id)
  end

  def validate_game_not_locked!
    raise 'Game is locked!' if @game.locked_at
  end

  def validate_game_not_full!
    raise 'Game is full!' if @game.players.count >= 6
  end
end
