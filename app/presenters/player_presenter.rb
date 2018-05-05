class PlayerPresenter < ApplicationPresenter
  def initialize(object, limited: false)
    @object = object
    @limited = limited
  end

  def as_json(*)
    return limited_view if @limited
    {
      id: @object.id,
      username: @object.user.username,
      game_id: @object.game_id,
      user_id: @object.user_id,
      token: @object.token.name,
      roll: @object.first_roll.slice(:id, :player_id, :die_one, :die_two),
      position: @object.space.position,
    }
  end

  def limited_view
    {
      id: @object.id,
      user_id: @object.user_id,
    }
  end
end
