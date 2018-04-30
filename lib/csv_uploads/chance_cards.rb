module CsvUploads
  class ChanceCards < CsvUploader
    def self.identifier
      "ChanceCard"
    end

    def self.label
      :id
    end
  end
end
