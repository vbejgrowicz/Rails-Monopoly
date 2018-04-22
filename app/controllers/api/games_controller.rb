class Api::GamesController < ApplicationController
  def new
    @game = Game.new(host_id: current_user.id)
    render json: { game: @game.slice(:id, :host_id, :available_tokens) }
  end

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
    validate_player!
    render json: { game: GamePresenter.new(@game) }
  end

  private

  def validate_player!
    raise 'You are not part of this game!' unless @game.is_player?(current_user.id)
  end
end
