class Api::PlayersController < ApplicationController
  def show
    @player = Player.find(params[:id])
    render json: { player: PlayerPresenter.new(@player) }
  end

  def create
    @player = CreatePlayer.run(params[:game_id], params[:token_id], current_user.id)
    render json: { player: PlayerPresenter.new(@player) }
  end
end
