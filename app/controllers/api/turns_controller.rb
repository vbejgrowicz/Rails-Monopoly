class Api::TurnsController < ApplicationController
  def index
    @turns = Turn.where(game_id: params[:game_id]).order(id: :asc).limit(10)
    render json: { turns: @turns.map { |turn| turn.slice(:id, :game_id, :player_id) } }
  end
end
