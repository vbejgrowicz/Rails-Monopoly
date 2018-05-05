class AddFirstRollToRolls < ActiveRecord::Migration[5.1]
  def change
    add_column(:rolls, :first_roll, :boolean, null: false, default: false)
  end
end
