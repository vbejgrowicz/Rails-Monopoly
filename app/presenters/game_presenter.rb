class GamePresenter < ApplicationPresenter
  def as_json(*)
    {
      id: @object.id,
      host_id: @object.host_id,
      created_at: Time.at(@object.created_at).strftime('%m/%d/%Y at %I:%M%p'),
      players: @object.players.count,
      available_tokens: @object.available_tokens,
    }
  end
end
