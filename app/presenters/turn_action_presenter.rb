class TurnActionPresenter < ApplicationPresenter
  def as_json(*)
    json = {
      id: @object.id,
      turn_id: @object.turn_id,
      action: @object.action.name,
      completed: @object.completed,
    }
    if @object.game_transaction
      json[:transaction] = GameTransactionPresenter.new(@object.game_transaction)
    else
      json[:transaction] = {}
    end
    json
  end
end
