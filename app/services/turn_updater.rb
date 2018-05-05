class TurnUpdater
  def self.run(turn, params)
    new(turn, params).run_update!
  end

  def initialize(turn, params)
    @turn = turn
    @params = params
  end

  def run_update!
    roll if @params[:turn_action] == 'roll'
    @turn.save! if @turn.changed?
    @turn
  end

  def roll
    validate_valid_roll!
    @turn.roll = Roll.create!(GenerateRoll.run(@turn.player_id))
  end

  private

  def validate_valid_roll!
    raise 'You already rolled! CHEATER!' if @turn.roll_id
  end
end
