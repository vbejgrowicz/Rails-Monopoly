class TurnUpdater
  def self.run(turn, params)
    new(turn, params).run_update!
  end

  def initialize(turn, params)
    @turn = turn
    @params = params
  end

  def run_update!
    ActiveRecord::Base.transaction do
      roll if @params[:turn_action] == 'roll'
      move if @params[:turn_action] == 'move'
      @turn.save! if @turn.changed?
    end
    @turn
  end

  def roll
    validate_valid_roll!
    @turn.roll = Roll.create!(GenerateRoll.run(@turn.player_id))
    @turn.end_space = Space.find_by(position: @turn.start_space.position + @turn.roll.total)
  end

  def move
    validate_valid_move!
    @turn.player.move_to(@turn.end_space_id)
  end

  private

  def validate_valid_move!
    raise 'Hmm, you did not roll yet!' if !@turn.roll_id
    raise 'You already moved! CHEATER!' if @turn.end_space_id == @turn.player.space_id
  end

  def validate_valid_roll!
    raise 'You already rolled! CHEATER!' if @turn.roll_id
  end
end
