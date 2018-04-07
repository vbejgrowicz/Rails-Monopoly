class CreateGamesTable < ActiveRecord::Migration[5.1]
  def change
    create_table :games do |t|
      t.integer :host_id, null: false
      t.timestamp :started_at
      t.timestamp :completed_at

      t.timestamps
    end
    add_index :games, :host_id
  end
end
