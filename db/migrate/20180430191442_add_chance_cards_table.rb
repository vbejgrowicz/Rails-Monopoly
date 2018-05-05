class AddChanceCardsTable < ActiveRecord::Migration[5.1]
  def change
    create_table :chance_cards do |t|
      t.string :description, null: false
      t.timestamps
    end
  end
end
