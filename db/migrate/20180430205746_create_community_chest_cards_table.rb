class CreateCommunityChestCardsTable < ActiveRecord::Migration[5.1]
  def change
    create_table :community_chest_cards do |t|
      t.string :description, null: false
      t.timestamps
    end
  end
end
