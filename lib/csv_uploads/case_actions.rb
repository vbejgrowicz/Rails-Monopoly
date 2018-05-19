module CsvUploads
  class CaseActions < CsvUploader
    def self.identifier
      "CaseAction"
    end

    def self.label
      :id
    end
  end
end
