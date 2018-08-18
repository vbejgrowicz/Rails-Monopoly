class AddMoneyToPlayers < ActiveRecord::Migration[5.2]
  def change
    add_column(:players, :money, :integer, null: false, default: 1500)
  end
end
