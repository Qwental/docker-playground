class HomeController < ApplicationController
  def index
    render plain: "Hello from Rails in Docker-ready project!"
  end
end
