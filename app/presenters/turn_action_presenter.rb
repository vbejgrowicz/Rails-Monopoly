class TurnActionPresenter < ApplicationPresenter
  def as_json(*)
    {
      turn_id: @object.turn_id,
      action: @object.action.name,
      completed: @object.completed,
    }
  end
end
