class CreateEventsTable < ActiveRecord::Migration[5.1]
  def change
    create_table :events do |t|
      t.string :name, null: false
      t.string :description
      t.timestamps
    end
  end
end
