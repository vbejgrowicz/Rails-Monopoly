class Api::GamesController < ApplicationController
  def index
    @games = Game.all
    render json: { games: @games.map { |game| GamePresenter.new(game) } }
  end

  def create
    @game = Game.create!(host_id: current_user.id)
    if @game
      Player.create!(game_id: @game.id, user_id: @game.host_id)
    end
    render json: { game: GamePresenter.new(@game) }
  end

  def show
    @game = Game.find(params[:id])
    render json: { game: GamePresenter.new(@game) }
  end
end
