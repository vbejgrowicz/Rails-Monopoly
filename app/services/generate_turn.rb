class GenerateTurn
  def self.run_first(game)
    player = get_next_player(game.id)
    Turn.create!(game_id: game.id, player_id: player.id, start_space_id: player.space_id)
  end

  def self.run(previous_turn)
    player = get_next_player(previous_turn.game_id, previous_turn.player_id)
    Turn.create!(game_id: previous_turn.game_id, player_id: player.id, start_space_id: player.space_id)
  end

  def self.get_next_player(game_id, current_player_id = nil)
    ordered_players = Player.ordered_by_first_roll(game_id)
    if current_player_id
      current_player_idx = ordered_players.index { |player| player.id == current_player_id }
      next_player_idx = (current_player_idx + 1) % ordered_players.size
      next_player = ordered_players[next_player_idx]
    else
      next_player = ordered_players.first
    end
    next_player
  end
end
