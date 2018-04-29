# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180429200616) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "color_sets", force: :cascade do |t|
    t.string "color", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "events", force: :cascade do |t|
    t.string "name", null: false
    t.string "description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "games", force: :cascade do |t|
    t.integer "host_id", null: false
    t.datetime "started_at"
    t.datetime "completed_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "locked_at"
    t.index ["host_id"], name: "index_games_on_host_id"
  end

  create_table "players", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "game_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "token_id", null: false
    t.integer "space_id", default: 1, null: false
    t.index ["game_id", "token_id"], name: "index_players_on_game_id_and_token_id", unique: true
    t.index ["game_id", "user_id", "space_id"], name: "index_players_on_game_id_and_user_id_and_space_id", unique: true
    t.index ["user_id", "game_id"], name: "index_players_on_user_id_and_game_id", unique: true
  end

  create_table "properties", force: :cascade do |t|
    t.integer "color_set_id", null: false
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["color_set_id"], name: "index_properties_on_color_set_id"
  end

  create_table "rolls", force: :cascade do |t|
    t.integer "player_id", null: false
    t.integer "die_one", null: false
    t.integer "die_two", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["player_id"], name: "index_rolls_on_player_id"
  end

  create_table "spaces", force: :cascade do |t|
    t.integer "position", null: false
    t.integer "property_id"
    t.integer "event_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["event_id"], name: "index_spaces_on_event_id"
    t.index ["position"], name: "index_spaces_on_position", unique: true
    t.index ["property_id"], name: "index_spaces_on_property_id"
  end

  create_table "tokens", force: :cascade do |t|
    t.string "name", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_tokens_on_name", unique: true
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "username", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

end
