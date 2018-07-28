class PropertyPresenter < ApplicationPresenter
  def initialize(property, game)
    @property = property
    @game = game
  end

  def as_json(*)
    {
      id: @property.id,
      name: @property.name,
      price_data: price_data,
      owner_id: @property.deed_for(@game).owner_id
    }
  end

  def price_data
    {
      buy_price: @property.buy_price,
      mortgage_value: @property.mortgage_value,
      mortgage_payoff: @property.mortgage_payoff,
      rent: @property.rent,
      rent_with_set: @property.rent_with_set,
      rent_with_one: @property.rent_with_one,
      rent_with_two: @property.rent_with_two,
      rent_with_three: @property.rent_with_three,
      rent_with_four: @property.rent_with_four,
      rent_with_hotel: @property.rent_with_hotel,
      build_cost: @property.build_cost,
    }
  end
end
