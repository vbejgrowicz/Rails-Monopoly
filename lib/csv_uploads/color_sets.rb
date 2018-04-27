class CsvUploads::ColorSets
  def self.run
    puts '--Uploading ColorSets--'
    CSV.foreach("#{Rails.root}/db/csv_seeds/color_sets.csv", headers: true) do |row|
      begin
        color_set = ColorSet.find_or_initialize_by(id: row['id'].to_i)
        color_set.attributes = row.to_hash
        if color_set.changed?
          color_set.save!
          puts "#{color_set.color} created!"
        else
          puts "#{color_set.color} unchanged"
        end
      rescue StandardError => e
        puts e.message
      end
    end
  end
end
