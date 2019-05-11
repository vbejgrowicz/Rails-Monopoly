class Api::TurnActionsController < ApplicationController
  def index
    @turn_actions = TurnAction.where(turn_id: params[:turn_id]).order(id: :desc)
    render json: { turn_actions: @turn_actions.map { |turn_action| TurnActionPresenter.new(turn_action) } }
  end

  def update
    @turn_action = TurnAction.find(params[:id])

    if @turn_action.buy?
      purch_prop = PurchaseProperty.run(@turn_action)
      broadcast_property_purchase(purch_prop)
    end

    if @turn_action.pay? && @turn_action.game_transaction # TODO: temporary until transactions are generated for luxury tax, income tax, etc...
      if @turn_action.game_transaction.rent?
        pay_rent = PayRent.run(@turn_action)
        broadcast_player_transaction(pay_rent)
      elsif @turn_action.game_transaction.bank_transaction?
        # do something else
      end
    end

    if @turn_action.draw?
      DrawCard.run(@turn_action)
    end

    @turn_action.update!(completed: true)
    render json: { turn_action: TurnActionPresenter.new(@turn_action) }
  end

  private

  def broadcast_property_purchase(purch_prop)
    ActionCable.server.broadcast('players_money', players: [{ money: purch_prop.player.money, player_id: purch_prop.player.id }])
    ActionCable.server.broadcast('properties', players: [{ player_id: purch_prop.player.id, property_id: purch_prop.property.id }])
  end

  def broadcast_player_transaction(player_transaction)
    ActionCable.server.broadcast(
      'players_money',
      players: [player_transaction.sender, player_transaction.receiver].compact.map do |player|
        { player_id: player.id, money: player.money }
      end
    )
  end
end
