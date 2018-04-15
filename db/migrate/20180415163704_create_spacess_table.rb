class CreateSpacessTable < ActiveRecord::Migration[5.1]
  def change
    create_table :spaces do |t|
      t.integer :position, null: false
      t.integer :property_id
      t.integer :event_id
      t.timestamps
    end
    add_index :spaces, :position, unique: true
    add_index :spaces, :property_id
    add_index :spaces, :event_id
  end
end
