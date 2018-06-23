class Api::SpacesController < ApplicationController
  def index
    @spaces = Space.includes(:event, property: [:color_set]).all
    render json: { spaces: @spaces.map { |space| SpacePresenter.new(space) } }
  end
end
