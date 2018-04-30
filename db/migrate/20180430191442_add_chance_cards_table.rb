class AddChanceCardsTable < ActiveRecord::Migration[5.1]
  def change
    create_table :chance_cards do |t|
      t.string :description_one, null: false, default: ''
      t.string :description_two, null: false, default: ''
      t.string :description_three, null: false, default: ''
      t.timestamps
    end
  end
end
