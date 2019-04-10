class GuideService
  attr_accessor :params

  def initialize(options = {})
    self.params = options
  end

  def all
    Guide.all
  end

  def search
    result = Guide.all

    if params[:sortField].present?
      sortHash = {}
      sortHash[params[:sortField].to_sym] = params[:sortDirection].to_sym
      result = result.order(sortHash)
    end

    if params[:searchValue].present?
      search = "%#{params[:searchValue]}%"
      result = result.where('official_name ILIKE ?', search)
    end

    result = result.page(params[:page]).per(params[:perPage])

    {
      draw: params[:draw] || 1,
      page: params[:page] || 1,
      per_page: params[:perPage] || 10,
      sort_field: params[:sortField],
      sort_direction: params[:sortDirection] || "asc",
      search_value: params[:searchValue] || "",
      total: guides.count,
      result: result
    }
  end
end