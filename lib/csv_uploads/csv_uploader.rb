module CsvUploads
  class CsvUploader
    def self.identifier
      "CsvUploader"
    end

    def self.label
      :body
    end

    def self.run
      puts "--Uploading #{identifier.pluralize}--"
      seed_ids = []
      CSV.foreach("#{Rails.root}/db/csv_seeds/#{identifier.pluralize.underscore}.csv", headers: true) do |row|
        begin
          instance = identifier.classify.constantize.find_or_initialize_by(id: row['id'].to_i)
          instance.attributes = row.to_hash
          if instance.changed?
            update_text = instance.persisted? ? 'updated' : 'created'
            instance.save!
            puts "#{instance.send(label)} #{update_text}!"
          else
            puts "#{instance.send(label)} unchanged"
          end
        rescue StandardError => e
          puts e.message
        end
        seed_ids << instance.id
      end
      identifier.classify.constantize.where.not(id: seed_ids).each do |record|
        puts "destroying #{record.send(label)}"
        record.destroy!
      end
    end
  end
end
