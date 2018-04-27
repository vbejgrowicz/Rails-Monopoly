module CsvUploads
  class Users < CsvUploader
    def self.identifier
      "User"
    end

    def self.label
      :email
    end
  end
end
