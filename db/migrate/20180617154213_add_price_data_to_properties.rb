class AddPriceDataToProperties < ActiveRecord::Migration[5.1]
  def change
    add_column(:properties, :mortgage_value, :integer, null: false)
    add_column(:properties, :mortgage_payoff, :integer, null: false)
    add_column(:properties, :rent, :integer)
    add_column(:properties, :rent_with_set, :integer)
    add_column(:properties, :rent_with_one, :integer)
    add_column(:properties, :rent_with_two, :integer)
    add_column(:properties, :rent_with_three, :integer)
    add_column(:properties, :rent_with_four, :integer)
    add_column(:properties, :rent_with_hotel, :integer)
    add_column(:properties, :build_cost, :integer)
  end
end
