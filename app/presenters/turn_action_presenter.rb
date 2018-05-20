class TurnActionPresenter < ApplicationPresenter
  def as_json(*)
    {
      id: @object.id,
      turn_id: @object.turn_id,
      action: @object.action.name,
      completed: @object.completed,
    }
  end
end
