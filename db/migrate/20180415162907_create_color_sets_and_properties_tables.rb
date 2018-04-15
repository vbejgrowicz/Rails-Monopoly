class CreateColorSetsAndPropertiesTables < ActiveRecord::Migration[5.1]
  def change
    create_table :color_sets do |t|
      t.string :color, null: false
      t.timestamps
    end
    create_table :properties do |t|
      t.integer :color_set_id, null: false
      t.string :name, null: false
      t.timestamps
    end
    add_index :properties, :color_set_id
  end
end
