class MakeSenderIdNullTrue < ActiveRecord::Migration[5.2]
  def change
    change_column_null(:game_transactions, :sender_id, true)
  end
end
