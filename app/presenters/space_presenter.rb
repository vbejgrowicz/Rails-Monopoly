class SpacePresenter < ApplicationPresenter
  def as_json(*)
    json = {
      title: @object.tile.name,
      id: @object.id,
      position: @object.position,
      category: create_category,
      is_event: false,
      is_property: false,
    }
    json.merge!(event_data) if @object.event_id
    json.merge!(property_data) if @object.property_id
    json
  end

  def event_data
    {
      color: nil,
      description: @object.event.description,
      is_event: true,
      price_data: {},
    }
  end

  def property_data
    {
      color: @object.property.color_set.color,
      description: nil,
      is_property: true,
      price_data: property_prices
    }
  end

  private

  def create_category
    return 'railroad' if is_railroad?
    @object.tile.name.gsub(' ', '-').delete('.&').downcase
  end

  def is_railroad?
    @object.tile.name.include?('Railroad') || @object.tile.name == 'Short Line'
  end

  def property_prices
    property = @object.property
    {
      buy_price: property.buy_price,
      mortgage_value: property.mortgage_value,
      mortgage_payoff: property.mortgage_payoff,
      rent: property.rent,
      rent_with_set: property.rent_with_set,
      rent_with_one: property.rent_with_one,
      rent_with_two: property.rent_with_two,
      rent_with_three: property.rent_with_three,
      rent_with_four: property.rent_with_four,
      rent_with_hotel: property.rent_with_hotel,
      build_cost: property.build_cost,
    }
  end
end
