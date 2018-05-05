class TurnPresenter < ApplicationPresenter
  def as_json(*)
    {
      id: @object.id,
      player: PlayerPresenter.new(@object.player, limited: true),
      roll: @object.roll ? RollPresenter.new(@object.roll) : {}
    }
  end
end
