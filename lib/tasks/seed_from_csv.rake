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

  task all: [:color_sets, :properties, :events, :spaces, :tokens]

  task :all_with_destroy do |_, args|
    Rake::Task["seed_from_csv:color_sets"].invoke(true)
    Rake::Task["seed_from_csv:properties"].invoke(true)
    Rake::Task["seed_from_csv:events"].invoke(true)
    Rake::Task["seed_from_csv:spaces"].invoke(true)
    Rake::Task["seed_from_csv:tokens"].invoke(true)
  end
end
