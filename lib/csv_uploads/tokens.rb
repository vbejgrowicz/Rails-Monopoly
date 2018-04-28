module CsvUploads
  class Tokens < CsvUploader
    def self.identifier
      "Token"
    end

    def self.label
      :name
    end
  end
end
