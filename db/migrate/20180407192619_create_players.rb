class CreatePlayers < ActiveRecord::Migration[5.1]
  def change
    create_table :players do |t|
      t.integer :user_id, null: false
      t.integer :game_id, null: false

      t.timestamps
    end
    add_index :players, [:user_id, :game_id], unique: true
  end
end
