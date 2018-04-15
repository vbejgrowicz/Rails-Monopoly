class SpacePresenter < ApplicationPresenter
  def as_json(*)
    json = {
      id: @object.id,
      position: @object.position
    }
    json.merge!(event_data) if @object.event_id
    json.merge!(property_data) if @object.property_id
    json
  end

  def event_data
    {
      title: @object.event.name,
      color: nil,
      description: @object.event.description,
    }
  end

  def property_data
    {
      title: @object.property.name,
      color: @object.property.color_set.color,
      description: nil,
    }
  end
end
