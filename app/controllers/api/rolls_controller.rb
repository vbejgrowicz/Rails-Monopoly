class Api::RollsController < ApplicationController
  def create
    @roll = Roll.create!(GenerateRoll.run(params[:player_id], params[:first_roll].present?))
    render json: { roll: @roll.slice(:id, :player_id, :die_one, :die_two, :first_roll) }
  end
end
