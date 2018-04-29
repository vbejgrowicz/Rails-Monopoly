class PlayerPresenter < ApplicationPresenter
  def as_json(*)
    {
      id: @object.id,
      game_id: @object.game_id,
      user_id: @object.user_id,
      token: @object.token.name,
      roll: @object.first_roll.slice(:id, :player_id, :die_one, :die_two)
    }
  end
end
