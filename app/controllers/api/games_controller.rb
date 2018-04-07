class Api::GamesController < ApplicationController
  def index
    @games = Game.all
    render json: { games: @games.map { |game| GamePresenter.new(game) } }
  end
end
