class AddCardIdToTurnActions < ActiveRecord::Migration[5.2]
  def change
    add_column(:turn_actions, :card_id, :integer)
    add_index :turn_actions, [:turn_id, :card_id], unique: true
  end
end
