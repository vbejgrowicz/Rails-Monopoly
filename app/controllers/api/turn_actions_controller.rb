class Api::TurnActionsController < ApplicationController
  def update
    @turn_action = TurnAction.find(params[:id])
    presenter = {}
    if @turn_action.buy?
      purch_prop = PurchaseProperty.run(@turn_action)
      presenter[:data] = {
        players: [
          {
            money: purch_prop.player.money,
            player_id: purch_prop.player.id,
            property_id: purch_prop.property.id,
          },
        ]
      }
    end
      }
    end
    @turn_action.update!(completed: true)
    presenter[:turn_action] = TurnActionPresenter.new(@turn_action)
    render json: presenter
  end
end
