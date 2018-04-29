class AddLockedAtToGames < ActiveRecord::Migration[5.1]
  def change
    add_column(:games, :locked_at, :timestamp)
  end
end
