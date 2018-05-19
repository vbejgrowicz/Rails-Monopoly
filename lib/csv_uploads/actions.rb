module CsvUploads
  class Actions < CsvUploader
    def self.identifier
      "Action"
    end

    def self.label
      :name
    end
  end
end
