class CreateChanceGamesTable < ActiveRecord::Migration[5.1]
  def change
    create_table :chance_games do |t|
      t.integer :chance_card_id, null: false
      t.integer :game_id, null: false
      t.integer :times_used, null: false, default: 0
      t.timestamps
    end
    add_index(:chance_games, [:chance_card_id, :game_id], unique: true)
  end
end
