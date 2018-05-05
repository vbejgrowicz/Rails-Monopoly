class GenerateRoll
  def self.run(player_id, first_roll = false)
    { player_id: player_id, die_one: rand(1..6), die_two: rand(1..6), first_roll: first_roll }
  end
end
