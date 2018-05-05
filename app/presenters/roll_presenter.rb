class RollPresenter < ApplicationPresenter
  def as_json(*)
    {
      id: @object.id,
      die_one: @object.die_one,
      die_two: @object.die_two,
    }
  end
end
