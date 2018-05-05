class Api::TurnsController < ApplicationController
  def index
    @turns = Turn.where(game_id: params[:game_id]).order(id: :asc).limit(10)
    render json: { turns: @turns.map { |turn| TurnPresenter.new(turn) } }
  end

  def update
    @turn = Turn.find(params[:id])
    validate_player_turn!
    @turn = TurnUpdater.run(@turn, update_params)
    render json: { turn: TurnPresenter.new(@turn) }
  end

  private

  def update_params
    params.permit(:turn_action)
  end

  def validate_player_turn!
    raise 'It is not your turn, CHEATER!' if current_user.id != @turn.player.user_id
  end
end
