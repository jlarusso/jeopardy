require 'rubygems'
require 'pry'
require 'httparty'
require 'json'
require 'awesome_print'


class Router
  def self.base_uri
    'http://localhost:9200'
  end
end


class JsonAdapter
  def initialize(file)
    File.open(file) do |f|
      @@content = JSON.load(f)
    end
  end

  def content
    @@content
  end
end


class QuestionBuilder
  include HTTParty
  base_uri Router.base_uri

  def initialize(json_adapter)
    @@content = json_adapter.content
  end

  def build_first
    q = @@content.first
    self.class.post('/jeopardy/questions', body: q.to_json)
  end

  def build_all
    length = @@content.length
    @@content.each_with_index do |q, i|
      print '.'
      self.class.post('/jeopardy/questions', body: q.to_json)
      break if i > 20
    end
  end

  def clear_all
    ap self.class.delete('/jeopardy/questions')
  end
end


class Question
  include HTTParty
  base_uri Router.base_uri

  def self.all
    body = { "query": { "match_all": {} } }
    post('/jeopardy/questions/_search', body)
  end

  def self.query(str)
    body = { "query": { "query_string": { "query": str } } }
    post('/jeopardy/questions/_search', body)
  end

  def self.field_query(field, str)
    body = { "query": { "query_string": { "query": str, "fields": [field] } } }
    post('/jeopardy/questions/_search', body)
  end
end


json_adapter = JsonAdapter.new('./questions.json')
qb = QuestionBuilder.new(json_adapter)

# qb.build_first
# qb.build_all
# qb.clear_all
# Question.all
binding.pry
