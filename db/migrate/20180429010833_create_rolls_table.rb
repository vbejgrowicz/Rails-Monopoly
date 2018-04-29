class CreateRollsTable < ActiveRecord::Migration[5.1]
  def change
    create_table :rolls do |t|
      t.integer :player_id, null: false
      t.integer :die_one, null: false
      t.integer :die_two, null: false

      t.timestamps
    end
    add_index(:rolls, :player_id)
  end
end
