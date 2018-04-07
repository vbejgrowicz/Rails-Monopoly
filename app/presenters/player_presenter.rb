class PlayerPresenter < ApplicationPresenter
  def as_json(*)
    {
      game_id: @object.game_id,
      user_id: @object.user_id
    }
  end
end
