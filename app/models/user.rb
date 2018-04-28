class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  has_many :players, dependent: :destroy
  has_many :hosted_games, class_name: 'Game', primary_key: :id, foreign_key: :host_id, dependent: :destroy
  has_many :active_games, through: :players, source: :game
end
