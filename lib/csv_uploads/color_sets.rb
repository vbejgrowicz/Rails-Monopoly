module CsvUploads
  class ColorSets < CsvUploader
    def self.identifier
      "ColorSet"
    end

    def self.label
      :color
    end
  end
end
