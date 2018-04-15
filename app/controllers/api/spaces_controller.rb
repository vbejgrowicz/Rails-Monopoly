class Api::SpacesController < ApplicationController
  def index
    @spaces = Space.all
    render json: { spaces: @spaces.map { |space| SpacePresenter.new(space) } }
  end
end
