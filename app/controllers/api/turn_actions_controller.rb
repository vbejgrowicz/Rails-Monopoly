class Api::TurnActionsController < ApplicationController
  def update
    @turn_action = TurnAction.find(params[:id])
    if @turn_action.buy?
      PurchaseProperty.run(@turn_action)
    end
    @turn_action.update!(completed: true)
    render json: { turn_action: TurnActionPresenter.new(@turn_action) }
  end
end
