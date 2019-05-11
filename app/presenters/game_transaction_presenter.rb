class GameTransactionPresenter < ApplicationPresenter
  def as_json(*)
    json = {
      receiver_id: @object.receiver_id,
      sender_id: @object.sender_id,
      amount: @object.amount,
      transaction_type: @object.transaction_type,
      property_name: nil,
      completed: @object.completed,
      canceled: @object.canceled,
    }
    json[:property_name] = @object.deed.property.name if @object.deed
    json
  end
end
