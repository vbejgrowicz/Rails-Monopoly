class AddCardTypeToTurnActions < ActiveRecord::Migration[5.2]
  def change
    add_column(:turn_actions, :card_type, :string)
    remove_index(:turn_actions, [:turn_id, :card_id])
    add_index(:turn_actions, [:turn_id, :card_id, :card_type], unique: true)
  end
end
