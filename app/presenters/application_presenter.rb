class ApplicationPresenter
  def initialize(object)
    @object = object
  end

  def as_json(*)
    { object: @object }
  end
end
