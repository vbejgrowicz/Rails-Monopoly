class CreateTurnActionsTable < ActiveRecord::Migration[5.1]
  def change
    create_table :turn_actions do |t|
      t.integer :turn_id, null: false
      t.integer :action_id, null: false
      t.boolean :completed, null: false, default: false
      t.timestamps
    end
    add_index :turn_actions, [:turn_id, :action_id]
  end
end
