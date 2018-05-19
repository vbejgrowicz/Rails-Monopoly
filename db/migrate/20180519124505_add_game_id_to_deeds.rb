class AddGameIdToDeeds < ActiveRecord::Migration[5.1]
  def change
    add_column(:deeds, :game_id, :integer, null: false)
    add_index(:deeds, [:property_id, :game_id], unique: true)
  end
end
