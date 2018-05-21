class GameTransactionPresenter < ApplicationPresenter
  def as_json(*)
    {
      receiver_id: @object.receiver_id,
      sender_id: @object.sender_id,
      amount: @object.amount,
      property_name: @object.deed.property.name,
      transaction_type: @object.transaction_type,
      completed: @object.completed,
      canceled: @object.canceled,
    }
  end
end
