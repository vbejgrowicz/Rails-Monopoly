class Api::TurnsController < ApplicationController
  def index
    @turns = Turn.where(game_id: params[:game_id]).order(id: :desc).limit(10)
    render json: { turns: @turns.map { |turn| TurnPresenter.new(turn) } }
  end

  def update
    @turn = Turn.find(params[:id])
    validate_player_turn!
    @turn = TurnUpdater.run(@turn, update_params)
    render json: { turn: TurnPresenter.new(@turn) }
  end

  def update_last
    turn = Turn.last
    raise 'too big!' if params[:spaces] > 12
    if params[:spaces] <= 6
      turn.roll.update!(die_one: params[:spaces], die_two: 0)
    else
      turn.roll.update!(die_one: 6, die_two: params[:spaces] - 6)
    end
    turn.update!(end_space_id: turn.start_space_id + params[:spaces])
    render json: { success: true}
  end

  private

  def update_params
    params.permit(:turn_action)
  end

  def validate_player_turn!
    raise 'It is not your turn, CHEATER!' if current_user.id != @turn.player.user_id
  end
end
