class Api::TurnActionsController < ApplicationController
  def index
    @turn_actions = TurnAction.where(turn_id: params[:turn_id]).order(id: :desc)
    render json: { turn_actions: @turn_actions.map { |turn_action| TurnActionPresenter.new(turn_action) } }
  end

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

    if @turn_action.pay? && @turn_action.game_transaction # TODO: temporary until transactions are generated for luxury tax, income tax, etc...
      pay_rent = PayRent.run(@turn_action)
      presenter[:data] = {
        players: [
          {
            player_id: pay_rent.sender.id,
            money: pay_rent.sender.money,
          },
          {
            player_id: pay_rent.receiver.id,
            money: pay_rent.receiver.money,
          },
        ]
      }
    end

    if @turn_action.draw?
      DrawCard.run(@turn_action)
    end

    @turn_action.update!(completed: true)
    presenter[:turn_action] = TurnActionPresenter.new(@turn_action)
    render json: presenter
  end
end
