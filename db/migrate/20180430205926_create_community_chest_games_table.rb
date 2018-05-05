class CreateCommunityChestGamesTable < ActiveRecord::Migration[5.1]
  def change
    create_table :community_chest_games do |t|
      t.integer :community_chest_card_id, null: false
      t.integer :game_id, null: false
      t.integer :times_used, null: false, default: 0
      t.timestamps
    end
    add_index(:community_chest_games, [:community_chest_card_id, :game_id], name: 'index_cc_games_on_cc_card_id_and_game_id', unique: true)
  end
end
