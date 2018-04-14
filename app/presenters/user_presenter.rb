class UserPresenter < ApplicationPresenter
  def as_json(*)
    {
      id: @object.id,
      email: @object.email,
      active_game_ids: @object.active_game_ids,
    }
  end
end
