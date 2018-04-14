class Api::UsersController < ApplicationController
  def show
    @user = current_user
    render json: { user: UserPresenter.new(@user) }
  end
end
