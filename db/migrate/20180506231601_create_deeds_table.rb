class CreateDeedsTable < ActiveRecord::Migration[5.1]
  def change
    create_table :deeds do |t|
      t.integer :property_id, null: false
      t.integer :owner_id
      t.timestamps
    end
    add_index :deeds, [:property_id, :owner_id], unique: true
  end
end
