class AddBuyPriceToProperties < ActiveRecord::Migration[5.1]
  def change
    add_column :properties, :buy_price, :integer, null: false
  end
end
