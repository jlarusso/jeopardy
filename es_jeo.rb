require 'elasticsearch'
require 'pry'
require 'awesome_print'

client = Elasticsearch::Client.new log: true

# Query DSL
# -----------------------------------------------------------------------------

# --- High Level / analyzed ---
# body = { "query": { "match_all": {} } }

# body = { "query": { "match": { "question": "Teller"} } }

# body = { "query": { "match_phrase": { "question": "to within one" } } }
# body = { "query": { "match": { "question": { "query": "to within one", "type": "phrase" } } } }

# --- Low Level / not analyzed ---
# body = { "query": { "term": { "category": "history"} } }

# -----------------------------------------------------------------------------

ap client.search index: 'jeopardy', type: 'questions', body: body
