module CsvUploads
  class Events < CsvUploader
    def self.identifier
      "Event"
    end

    def self.label
      :name
    end
  end
end
