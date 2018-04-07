module Errors
  module ErrorHandler
    def self.included(klass)
      klass.class_eval do
        rescue_from StandardError do |e|
          render json: { error: e.message }, status: 500
        end
      end
    end
  end
end
