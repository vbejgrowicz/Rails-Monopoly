class AddTokenIdToPlayers < ActiveRecord::Migration[5.1]
  def change
    add_column(:players, :token_id, :integer, null: false)
    add_index(:players, [:game_id, :token_id], unique: true)
  end
end
