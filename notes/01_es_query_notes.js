// Elasticsearch RESTful API
// ----------------------------------------------------------------------------




// text queries can be analyzed or not analyzed:
// http://www.elasticsearch.org/guide/en/elasticsearch/guide/current/term-vs-full-text.html





// What is an example url made up of?
// ----------------------------------------------------------------------------
"http://localhost:9200/places/restaurant"

// server: http://localhost:9200
// index: places
// type: restaurant


// How do you create a new document?
// ----------------------------------------------------------------------------
// POST:
"localhost:9200/jeopardy/questions/"
// Body:
{"category":"LAKES & RIVERS","air_date":"1984-09-10","question":"'River mentioned most often in the Bible'","value":"$100","answer":"the Jordan","round":"Jeopardy!","show_number":"1"}
// other questions:
{"category":"INVENTIONS","air_date":"1984-09-10","question":"'Marconi's wonderful wireless'","value":"$100","answer":"the radio","round":"Jeopardy!","show_number":"1"}
{"category":"ANIMALS","air_date":"1984-09-10","question":"'These rodents first got to America by stowing away on ships'","value":"$100","answer":"rats","round":"Jeopardy!","show_number":"1"}
{"category":"FOREIGN CUISINE","air_date":"1984-09-10","question":"'The \"coq\" in coq au vin'","value":"$100","answer":"chicken","round":"Jeopardy!","show_number":"1"}


// Search for all questions
// ----------------------------------------------------------------------------
// HTTPie shortcut
`http POST localhost:9200/jeopardy/questions/_search '{"query":{"match_all":{}}}'`
// POST:
"localhost:9200/jeopardy/questions/_search"
// Body:
{ "query": { "match_all": {} } }


// Search for questions using a query
// ----------------------------------------------------------------------------
// HTTPie shortcut
`http POST localhost:9200/jeopardy/questions/_search '{"query":{"query_string":{"query":"rodents"}}}'`
// POST:
"localhost:9200/jeopardy/questions/_search"
// Body:
{ "query": { "query_string": { "query": "rodents" } } }


// Search for questions using a query looking at particular fields
// ----------------------------------------------------------------------------
// HTTPie shortcut
`http POST localhost:9200/jeopardy/questions/_search '{"query":{"query_string":{"query":"$100","fields":["value"]}}}'`
`http POST localhost:9200/jeopardy/questions/_search '{"query":{"term":{"value":"$100"}}}'`
// POST:
"localhost:9200/jeopardy/questions/_search"
// Body:
{ "query": { "query_string": { "query": "$100", "fields": ["value"] } } }


// Search for questions using a filter
// ----------------------------------------------------------------------------
// HTTPie shortcut
`http POST localhost:9200/jeopardy/questions/_search '{"query":{"filtered":{"filter":{"range":{"show_number":{"gte":1}}}}}}'`
// POST:
"localhost:9200/jeopardy/questions/_search"
// Body:
{
  "query": {
    "filtered": {
      "filter": {
        "range": {
          "show_number": {
            "gte": 1
          }
        }
      }
    }
  }
}


// Search for questions using a query looking at particular fields and also using a filter
// ----------------------------------------------------------------------------
// HTTPie shortcut
`http POST localhost:9200/jeopardy/questions/_search '{"query":{"filtered":{"filter":{"range":{"show_number":{"gte":1}}},"query":{"query_string":{"query":"$100","fields":["value"]}}}}}'`
// POST:
"localhost:9200/jeopardy/questions/_search"
// Body:
{
  "query": {
    "filtered": {

      "filter": {
        "range": {
          "show_number": {
            "gte": 1
          }
        }
      },

      "query": {
        "query_string": {
          "query": "$100",
          "fields": ["value"]
        }
      }
    }
  }
}


// Search for questions using a match query
// Note, instead of "round" you can match "round.qualifying" or something if it
// is a nested hash.
// ----------------------------------------------------------------------------
// HTTPie shortcut
`http POST localhost:9200/jeopardy/questions/_search '{"query":{"filtered":{"query":{"match":{"round":"Jeopardy!"}},"filter":{"range":{"show_number":{"gte":1}}}}}}'`
// POST:
"localhost:9200/jeopardy/questions/_search"
// Body:
{
  "query": {
    "filtered": {

      "query": {
        "match": {
          "round": "Jeopardy!"
        }
      },

      "filter": {
        "range": {
          "show_number": {
            "gte": 1
          }
        }
      }

    }
  }
}
