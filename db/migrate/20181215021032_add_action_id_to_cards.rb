class AddActionIdToCards < ActiveRecord::Migration[5.2]
  def change
    add_column(:chance_cards, :action_id, :integer, null: false)
    add_column(:community_chest_cards, :action_id, :integer, null: false)
    add_index(:chance_cards, :action_id)
    add_index(:community_chest_cards, :action_id)
  end
end
