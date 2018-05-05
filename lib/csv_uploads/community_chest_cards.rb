module CsvUploads
  class CommunityChestCards < CsvUploader
    def self.identifier
      "CommunityChestCard"
    end

    def self.label
      :id
    end
  end
end
