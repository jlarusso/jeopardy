require 'pry'
require 'json'

File.open('jeopardy.json') do |f|
  json = JSON.load(f)

  binding.pry

end
