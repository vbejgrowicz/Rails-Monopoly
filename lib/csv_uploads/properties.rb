module CsvUploads
  class Properties < CsvUploader
    def self.identifier
      "Property"
    end

    def self.label
      :name
    end
  end
end
