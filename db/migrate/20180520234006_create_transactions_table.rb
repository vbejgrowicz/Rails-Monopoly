class CreateTransactionsTable < ActiveRecord::Migration[5.1]
  def change
    create_table :game_transactions do |t|
      t.integer :turn_action_id, null: false
      t.integer :deed_id
      t.string :transaction_type, null: false
      t.integer :sender_id, null: false
      t.integer :receiver_id
      t.integer :amount, null: false
      t.boolean :canceled, null: false, default: false
      t.boolean :completed, null: false, default: false
      t.timestamps
    end
    add_index(:game_transactions, :turn_action_id)
    add_index(:game_transactions, :sender_id)
    add_index(:game_transactions, :receiver_id)
    add_index(:game_transactions, :deed_id)
  end
end
