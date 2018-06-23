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
    @game = GameUpdater.run_create(current_user, params)
    render json: { game: GamePresenter.new(@game) }
  end

  def show
    @game = Game.find(params[:id])
    if params[:join_request] && params[:join_request] == 'true'
      return render json: { game: @game.slice(:id, :host_id, :available_tokens) }
    end
    validate_player!
    @players = @game.ordered_players.includes(:user, :token, :space, :rolls)
    render json: { game: GamePresenter.new(@game, detailed: true, players: @players) }
  end

  def update
    @game = Game.find(params[:id])
    validate_host!
    @game = GameUpdater.run_update(@game, update_params)
    render json: { game: GamePresenter.new(@game, detailed: true) }
  end

  private

  def update_params
    params.permit(:started_at, :locked_at, :completed_at)
  end

  def validate_player!
    raise 'You are not part of this game!' unless @game.is_player?(current_user.id)
  end

  def validate_host!
    raise 'You are not the host of this game!' unless @game.is_host?(current_user.id)
  end
end
