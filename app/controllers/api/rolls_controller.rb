class Api::RollsController < ApplicationController
  def create
    @roll = Roll.create!(generate_roll)
    render json: { roll: @roll.slice(:id, :player_id, :die_one, :die_two) }
  end

  private

  def generate_roll
    { player_id: params[:player_id], die_one: rand(1..6), die_two: rand(1..6) }
  end
end
