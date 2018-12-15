class TurnPresenter < ApplicationPresenter
  def as_json(*)
    {
      id: @object.id,
      player: PlayerPresenter.new(@object.player, limited: true),
      roll: @object.roll ? RollPresenter.new(@object.roll) : {},
      start_space_id: @object.start_space_id,
      end_space_id: @object.end_space_id,
      actions: @object.turn_actions.order(id: :desc).map { |turn_action| TurnActionPresenter.new(turn_action) },
    }
  end
end
