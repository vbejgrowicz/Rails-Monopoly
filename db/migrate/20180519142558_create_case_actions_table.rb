class CreateCaseActionsTable < ActiveRecord::Migration[5.1]
  def change
    create_table :case_actions do |t|
      t.integer :action_id, null: false
      t.integer :actionable_id, null: false
      t.string :actionable_type, null: false
      t.timestamps
    end

    add_index(:case_actions, [:actionable_id, :actionable_type, :action_id], unique: true, name: 'index_ca_on_act_id_and_act_type_and_act_id')
  end
end
