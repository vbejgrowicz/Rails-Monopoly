namespace :seed_from_csv do
  desc 'Seed Color Sets'
  task :color_sets, [:begin_destroy] => :environment do |_, args|
    CsvUploads::ColorSets.run(begin_destroy: args.begin_destroy)
  end

  desc 'Seed Properties'
  task :properties, [:begin_destroy] => :environment do |_, args|
    CsvUploads::Properties.run(begin_destroy: args.begin_destroy)
  end

  desc 'Seed Events'
  task :events, [:begin_destroy] => :environment do |_, args|
    CsvUploads::Events.run(begin_destroy: args.begin_destroy)
  end

  desc 'Seed Spaces'
  task :spaces, [:begin_destroy] => :environment do |_, args|
    CsvUploads::Spaces.run(begin_destroy: args.begin_destroy)
  end

  desc 'Seed Tokens'
  task :tokens, [:begin_destroy] => :environment do |_, args|
    CsvUploads::Tokens.run(begin_destroy: args.begin_destroy)
  end

  desc 'Seed Users'
  task :users, [:begin_destroy] => :environment do |_, args|
    CsvUploads::Users.run(begin_destroy: args.begin_destroy)
  end

  desc 'Seed Actions'
  task :actions, [:begin_destroy] => :environment do |_, args|
    CsvUploads::Actions.run(begin_destroy: args.begin_destroy)
  end

  desc 'Seed Chance Cards'
  task :chance_cards, [:begin_destroy] => :environment do |_, args|
    CsvUploads::ChanceCards.run(begin_destroy: args.begin_destroy)
  end

  desc 'Seed Community Chest Cards'
  task :community_chest_cards, [:begin_destroy] => :environment do |_, args|
    CsvUploads::CommunityChestCards.run(begin_destroy: args.begin_destroy)
  end

  task all: [:color_sets, :properties, :events, :spaces, :tokens, :users, :actions, :chance_cards, :community_chest_cards]

  task :all_with_destroy do |_, args|
    Rake::Task["seed_from_csv:color_sets"].invoke(true)
    Rake::Task["seed_from_csv:properties"].invoke(true)
    Rake::Task["seed_from_csv:events"].invoke(true)
    Rake::Task["seed_from_csv:spaces"].invoke(true)
    Rake::Task["seed_from_csv:tokens"].invoke(true)
    Rake::Task["seed_from_csv:users"].invoke(true)
    Rake::Task["seed_from_csv:actions"].invoke(true)
    Rake::Task["seed_from_csv:chance_cards"].invoke(true)
    Rake::Task["seed_from_csv:community_chest_cards"].invoke(true)
  end
end
