class Api::PropertiesController < ApplicationController
  def index
    @properties = Property.all
    @game = Game.find(params[:game_id])
    render json: { properties: @properties.map { |property| PropertyPresenter.new(property, @game) } }
  end
end
