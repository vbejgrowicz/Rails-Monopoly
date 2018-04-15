# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

brown = ColorSet.create!(color: 'brown')
light_blue = ColorSet.create!(color: 'light blue')
purple = ColorSet.create!(color: 'purple')
orange = ColorSet.create!(color: 'orange')
red = ColorSet.create!(color: 'red')
yellow = ColorSet.create!(color: 'yellow')
green = ColorSet.create!(color: 'green')
dark_blue = ColorSet.create!(color: 'dark blue')
black = ColorSet.create!(color: 'black')
white = ColorSet.create!(color: 'white')

med_ave = Property.create!(name: 'Mediterranean Avenue', color_set_id: brown.id)
baltic_ave = Property.create!(name: 'Baltic Avenue', color_set_id: brown.id)

ori_ave = Property.create!(name: 'Oriental Avenue', color_set_id: light_blue.id)
ver_ave = Property.create!(name: 'Vermont Avenue', color_set_id: light_blue.id)
conn_ave = Property.create!(name: 'Connecticut Avenue', color_set_id: light_blue.id)

st_char_pl = Property.create!(name: 'St. Charles Place', color_set_id: purple.id)
states_ave = Property.create!(name: 'States Avenue', color_set_id: purple.id)
vir_ave = Property.create!(name: 'Virginia Avenue', color_set_id: purple.id)

st_jam_pl = Property.create!(name: 'St. James Place', color_set_id: orange.id)
ten_ave = Property.create!(name: 'Tennessee Avenue', color_set_id: orange.id)
ny_ave = Property.create!(name: 'New York Avenue', color_set_id: orange.id)

ky_ave = Property.create!(name: 'Kentucky Avenue', color_set_id: red.id)
ind_ave = Property.create!(name: 'Indiana Avenue', color_set_id: red.id)
ill_ave = Property.create!(name: 'Illinois Avenue', color_set_id: red.id)

atl_ave = Property.create!(name: 'Atlantic Avenue', color_set_id: yellow.id)
vent_ave = Property.create!(name: 'Ventnor Avenue', color_set_id: yellow.id)
marv_gard = Property.create!(name: 'Marvin Gardens', color_set_id: yellow.id)

pac_ave = Property.create!(name: 'Pacific Avenue', color_set_id: green.id)
nc_ave = Property.create!(name: 'North Carolina Avenue', color_set_id: green.id)
pa_ave = Property.create!(name: 'Pennsylvania Avenue', color_set_id: green.id)

park_pl = Property.create!(name: 'Park Place', color_set_id: dark_blue.id)
board = Property.create!(name: 'Boardwalk', color_set_id: dark_blue.id)

rr = Property.create!(name: 'Reading Railroad', color_set_id: black.id)
pr = Property.create!(name: 'Pennsylvania Railroad', color_set_id: black.id)
bor = Property.create!(name: 'B. & O. Railroad', color_set_id: black.id)
sl = Property.create!(name: 'Short Line', color_set_id: black.id)

ec = Property.create!(name: 'Electric Company', color_set_id: white.id)
ww = Property.create!(name: 'Water Works', color_set_id: white.id)

comm_chest = Event.create!(name: 'Community Chest', description: 'Follow Instructions On Top Card')
chance = Event.create!(name: 'Chance')
inc_tax = Event.create!(name: 'Income Tax', description: 'Pay $200')
in_jail = Event.create!(name: 'In Jail', description: 'Just Visiting')
free_parking = Event.create!(name: 'Free Parking')
go_to_jail = Event.create!(name: 'Go To Jail')
lux_tax = Event.create!(name: 'Luxury Tax', description: 'Pay $75.00')
go = Event.create!(name: 'Go', description: 'Collect $200.00 Salary As You Pass')

Space.create!(position: 0, property_id: nil, event_id: go.id)
Space.create!(position: 1, property_id: med_ave.id, event_id: nil)
Space.create!(position: 2, property_id: nil, event_id: comm_chest.id)
Space.create!(position: 3, property_id: baltic_ave.id, event_id: nil)
Space.create!(position: 4, property_id: nil, event_id: inc_tax.id)
Space.create!(position: 5, property_id: rr.id, event_id: nil)
Space.create!(position: 6, property_id: ori_ave.id, event_id: nil)
Space.create!(position: 7, property_id: nil, event_id: chance.id)
Space.create!(position: 8, property_id: ver_ave.id, event_id: nil)
Space.create!(position: 9, property_id: conn_ave.id, event_id: nil)
Space.create!(position: 10, property_id: nil, event_id: in_jail.id)
Space.create!(position: 11, property_id: st_char_pl.id, event_id: nil)
Space.create!(position: 12, property_id: ec.id, event_id: nil)
Space.create!(position: 13, property_id: states_ave.id, event_id: nil)
Space.create!(position: 14, property_id: vir_ave.id, event_id: nil)
Space.create!(position: 15, property_id: pr.id, event_id: nil)
Space.create!(position: 16, property_id: st_jam_pl.id, event_id: nil)
Space.create!(position: 17, property_id: nil, event_id: comm_chest.id)
Space.create!(position: 18, property_id: ten_ave.id, event_id: nil)
Space.create!(position: 19, property_id: ny_ave.id, event_id: nil)
Space.create!(position: 20, property_id: nil, event_id: free_parking.id)
Space.create!(position: 21, property_id: ky_ave.id, event_id: nil)
Space.create!(position: 22, property_id: nil, event_id: chance.id)
Space.create!(position: 23, property_id: ind_ave.id, event_id: nil)
Space.create!(position: 24, property_id: ill_ave.id, event_id: nil)
Space.create!(position: 25, property_id: bor.id, event_id: nil)
Space.create!(position: 26, property_id: atl_ave.id, event_id: nil)
Space.create!(position: 27, property_id: vent_ave.id, event_id: nil)
Space.create!(position: 28, property_id: ww.id, event_id: nil)
Space.create!(position: 29, property_id: marv_gard.id, event_id: nil)
Space.create!(position: 30, property_id: nil, event_id: go_to_jail.id)
Space.create!(position: 31, property_id: pac_ave.id, event_id: nil)
Space.create!(position: 32, property_id: nc_ave.id, event_id: nil)
Space.create!(position: 33, property_id: nil, event_id: comm_chest.id)
Space.create!(position: 34, property_id: pa_ave.id, event_id: nil)
Space.create!(position: 35, property_id: sl.id, event_id: nil)
Space.create!(position: 36, property_id: nil, event_id: chance.id)
Space.create!(position: 37, property_id: park_pl.id, event_id: nil)
Space.create!(position: 38, property_id: nil, event_id: lux_tax.id)
Space.create!(position: 39, property_id: board.id, event_id: nil)
