class AddTurnsTable < ActiveRecord::Migration[5.1]
  def change
    create_table :turns do |t|
      t.integer :game_id, null: false
      t.integer :player_id, null: false
      t.integer :roll_id
      t.integer :start_space_id
      t.integer :end_space_id
      t.boolean :completed, null: false, default: false
      t.timestamps
    end
    add_index :turns, :game_id
    add_index :turns, :player_id
  end
end
