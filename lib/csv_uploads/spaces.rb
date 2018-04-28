module CsvUploads
  class Spaces < CsvUploader
    def self.identifier
      "Space"
    end

    def self.label
      :position
    end
  end
end
