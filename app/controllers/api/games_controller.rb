class Api::GamesController < ApplicationController
  def index
    @games = Game.all
    render json: { games: @games }
  end
end
