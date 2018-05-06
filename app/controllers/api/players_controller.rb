class Api::PlayersController < ApplicationController
  def show
    @player = Player.find(params[:id])
    render json: { player: PlayerPresenter.new(@player) }
  end

  def create
    @player = Player.create!(game_id: params[:game_id], token_id: params[:token_id], user_id: current_user.id)
    render json: { player: PlayerPresenter.new(@player) }
  end
end
