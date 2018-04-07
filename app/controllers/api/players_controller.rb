class Api::PlayersController < ApplicationController
  def create
    @player = Player.create!(game_id: params[:game_id], user_id: current_user.id)
    render json: { player: PlayerPresenter.new(@player) }
  end
end
