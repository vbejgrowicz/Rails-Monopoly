class CardPresenter < ApplicationPresenter
  def as_json(*)
    {
      card_type: @object.class.to_s,
      description: @object.description,
    }
  end
end
