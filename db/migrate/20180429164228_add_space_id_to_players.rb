class AddSpaceIdToPlayers < ActiveRecord::Migration[5.1]
  def change
    add_column(:players, :space_id, :integer, null: false, default: 1)
    add_index(:players, [:game_id, :user_id, :space_id], unique: true)
  end
end
