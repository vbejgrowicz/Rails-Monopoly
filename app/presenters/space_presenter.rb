class SpacePresenter < ApplicationPresenter
  def as_json(*)
    json = {
      title: @object.tile.name,
      id: @object.id,
      position: @object.position,
      category: create_category,
    }
    json.merge!(event_data) if @object.event_id
    json.merge!(property_data) if @object.property_id
    json
  end

  def event_data
    {
      color: nil,
      description: @object.event.description,
    }
  end

  def property_data
    {
      color: @object.property.color_set.color,
      description: nil,
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
end
