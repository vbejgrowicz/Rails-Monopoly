namespace :seed_from_csv do
  desc 'Seed Color Sets'
  task :color_sets => :environment do
    CsvUploads::ColorSets.run
  end

  desc 'Seed Properties'
  task :properties => :environment do
    CsvUploads::Properties.run
  end

  desc 'Seed Events'
  task :events => :environment do
    CsvUploads::Events.run
  end

  desc 'Seed Spaces'
  task :spaces => :environment do
    CsvUploads::Spaces.run
  end

  desc 'Seed Tokens'
  task :tokens => :environment do
    CsvUploads::Tokens.run
  end
end
