namespace :seed_from_csv do
  desc "Seed Color Sets"
  task :color_sets => :environment do
    CsvUploads::ColorSets.run
  end
end
